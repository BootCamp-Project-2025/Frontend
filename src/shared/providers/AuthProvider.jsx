import Keycloak from "keycloak-js";
import { syncUser } from "../api/AuthApi";
import {
  setAuthToken,
  setupAuthInterceptor,
} from "../api/axios/AxiosConnection";
import { useRef, useReducer, useEffect, useCallback, useMemo } from "react";
import AuthContext from "../contexts/AuthContext";
import PropTypes from "prop-types";
import { Loading } from "../components/molecules/Loading";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: "",
  refreshToken: "",
  roles: [],
  isEmailVerified: false,
  keycloak: null,
  isLoading: true,
};

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "token";
const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";
const ROLES_STORAGE_KEY = "roles";
const TOKEN_EXPIRY_KEY = "token_expiry";

function authReducer(state, action) {
  switch (action.type) {
    case "INIT_KEYCLOAK":
      return { ...state, keycloak: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        roles: action.payload.roles,
        user: action.payload.user,
        isLoading: false,
      };
    case "SET_TOKENS":
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case "LOGOUT":
      return { ...initialState, keycloak: state.keycloak, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const keycloakRef = useRef(null);
  const refreshIntervalRef = useRef(null);
  const didInit = useRef(false);

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(ROLES_STORAGE_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  }, []);

  const saveSessionToLocalStorage = useCallback(
    (user, token, refreshToken, roles) => {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
        const keycloak = keycloakRef.current;
        if (keycloak?.tokenParsed?.exp) {
          localStorage.setItem(
            TOKEN_EXPIRY_KEY,
            keycloak.tokenParsed.exp.toString()
          );
        }
      }
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
      }
      if (roles.length > 0) {
        localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
      }
    },
    []
  );

  const isTokenExpired = useCallback(() => {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true;

    const now = Math.ceil(Date.now() / 1000);
    const expiry = parseInt(expiryTime, 10);

    return expiry <= now + 30;
  }, []);

  const isRefreshTokenValid = useCallback((keycloak) => {
    if (!keycloak || !keycloak.refreshToken) {
      console.warn("Keycloak instance or refresh token is not available");
      return false;
    }

    try {
      if (keycloak.refreshTokenParsed && keycloak.refreshTokenParsed.exp) {
        const now = Math.ceil(Date.now() / 1000);
        if (keycloak.refreshTokenParsed.exp < now) {
          console.log("Refresh token expired");
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Error validating refresh token", error);
      return false;
    }
  }, []);

  const attemptTokenRefresh = useCallback(async () => {
    const keycloak = keycloakRef.current;
    if (!keycloak) {
      throw new Error("Keycloak instance not available");
    }

    if (!keycloak.refreshToken) {
      const storedRefreshToken = localStorage.getItem(
        REFRESH_TOKEN_STORAGE_KEY
      );
      if (storedRefreshToken) {
        keycloak.refreshToken = storedRefreshToken;
      }
    }

    if (!isRefreshTokenValid(keycloak)) {
      throw new Error("Refresh token is not valid or expired");
    }

    try {
      const refreshed = await keycloak.updateToken(-1);

      if (refreshed && keycloak.token) {
        console.log("Tokens refreshed successfully");

        dispatch({
          type: "SET_TOKENS",
          payload: {
            token: keycloak.token,
            refreshToken: keycloak.refreshToken,
          },
        });

        setAuthToken(keycloak.token);

        const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "{}");
        const roles = JSON.parse(
          localStorage.getItem(ROLES_STORAGE_KEY) || "[]"
        );
        saveSessionToLocalStorage(
          user,
          keycloak.token,
          keycloak.refreshToken,
          roles
        );

        return keycloak.token;
      }

      throw new Error("Token refresh failed");
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  }, [isRefreshTokenValid, saveSessionToLocalStorage]);

  const refreshKeycloakToken = useCallback(() => {
    return new Promise((resolve, reject) => {
      const keycloak = keycloakRef.current;
      if (keycloak && keycloak.token) {
        keycloak
          .updateToken(30)
          .then(() => {
            dispatch({
              type: "SET_TOKENS",
              payload: {
                token: keycloak.token,
                refreshToken: keycloak.refreshToken,
              },
            });
            setAuthToken(keycloak.token);

            const user = JSON.parse(
              localStorage.getItem(USER_STORAGE_KEY) || "{}"
            );
            const roles = JSON.parse(
              localStorage.getItem(ROLES_STORAGE_KEY) || "[]"
            );
            saveSessionToLocalStorage(
              user,
              keycloak.token,
              keycloak.refreshToken,
              roles
            );

            resolve(keycloak.token);
          })
          .catch((err) => {
            console.error("Token update failed", err);
            reject(err);
          });
      } else {
        reject(new Error("Keycloak instance or token not available"));
      }
    });
  }, [saveSessionToLocalStorage]);

  const syncUserWithRetry = useCallback(
    async (maxRetries = 1) => {
      let lastError = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          console.log(
            `Attempting to sync user (attempt ${attempt + 1}/${maxRetries + 1})`
          );
          const user = await syncUser();
          return user;
        } catch (error) {
          console.error(`User sync failed on attempt ${attempt + 1}:`, error);
          lastError = error;

          if (
            attempt < maxRetries &&
            (error.status === 401 || error.status === 403)
          ) {
            try {
              console.log("Attempting to refresh token before retry");
              await refreshKeycloakToken();
              await new Promise((resolve) => setTimeout(resolve, 100));
            } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
              throw refreshError;
            }
          }
        }
      }

      throw lastError;
    },
    [refreshKeycloakToken]
  );

  const loadSessionFromLocalStorage = useCallback(async () => {
    const userStr = localStorage.getItem(USER_STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    const rolesStr = localStorage.getItem(ROLES_STORAGE_KEY);

    if (!userStr || (!token && !refreshToken)) {
      console.log("No session data found in localStorage");
      return false;
    }

    try {
      const user = JSON.parse(userStr);
      const roles = rolesStr ? JSON.parse(rolesStr) : [];

      if (keycloakRef.current) {
        keycloakRef.current.token = token;
        keycloakRef.current.refreshToken = refreshToken;
      }

      if (isTokenExpired()) {
        console.log("Access token expired, attempting refresh...");

        try {
          const newToken = await attemptTokenRefresh();
          if (!newToken) {
            console.log("Token refresh failed, clearing session");
            clearLocalStorage();
            dispatch({ type: "LOGOUT" });
            return false;
          }

          const updatedToken = keycloakRef.current?.token || token;
          const updatedRefreshToken =
            keycloakRef.current?.refreshToken || refreshToken;

          setAuthToken(updatedToken);

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user,
              token: updatedToken,
              refreshToken: updatedRefreshToken,
              roles,
            },
          });
        } catch (refreshError) {
          console.error("Failed to refresh tokens:", refreshError);
          clearLocalStorage();
          dispatch({ type: "LOGOUT" });
          return false;
        }
      } else {
        setAuthToken(token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user,
            token,
            refreshToken,
            roles,
          },
        });
      }

      try {
        const updatedUser = await syncUserWithRetry();
        const updatedRoles =
          keycloakRef.current?.tokenParsed?.realm_access?.roles || roles;

        const finalUser = {
          ...updatedUser,
          isTeacher: updatedRoles.includes("FREELANCER"),
        };

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: finalUser,
            token: keycloakRef.current?.token || token,
            refreshToken: keycloakRef.current?.refreshToken || refreshToken,
            roles: updatedRoles,
          },
        });

        saveSessionToLocalStorage(
          finalUser,
          keycloakRef.current?.token || token,
          keycloakRef.current?.refreshToken || refreshToken,
          updatedRoles
        );
      } catch (error) {
        console.error("Error syncing user during session restore", error);
      }

      return true;
    } catch (error) {
      console.error("Error loading session from localStorage", error);
      clearLocalStorage();
      dispatch({ type: "LOGOUT" });
      return false;
    }
  }, [
    isTokenExpired,
    attemptTokenRefresh,
    clearLocalStorage,
    saveSessionToLocalStorage,
    syncUserWithRetry,
  ]);

  const handleSignUp = useCallback((callback) => {
    const keycloak = keycloakRef.current;
    keycloak?.register().then(() => {
      if (callback) {
        console.log("Sign up successful");
        callback();
      }
    });
  }, []);

  const handleLogin = useCallback(() => {
    keycloakRef.current?.login();
  }, []);

  const handleLogout = useCallback(() => {
    clearInterval(refreshIntervalRef.current);
    clearLocalStorage();
    setAuthToken(null);
    dispatch({ type: "LOGOUT" });
    keycloakRef.current?.logout({
      redirectUri: window.location.origin,
    });
  }, [clearLocalStorage]);

  const setupLoginFlow = useCallback(async () => {
    const keycloak = keycloakRef.current;
    if (!keycloak) return;

    const roles = keycloak.tokenParsed?.realm_access?.roles || [];
    const token = keycloak.token;
    const refreshToken = keycloak.refreshToken;

    setAuthToken(token);

    try {
      const user = await syncUserWithRetry();
      const finalUser = { ...user, isTeacher: roles.includes("FREELANCER") };

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token,
          refreshToken,
          roles,
          user: finalUser,
        },
      });

      saveSessionToLocalStorage(finalUser, token, refreshToken, roles);
    } catch (error) {
      console.error("Error syncing user after all retries", error);
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    refreshIntervalRef.current = setInterval(() => {
      refreshKeycloakToken().catch((error) => {
        console.error("Scheduled token refresh failed:", error);
      });
    }, 240000);
  }, [saveSessionToLocalStorage, syncUserWithRetry, refreshKeycloakToken]);

  const updateSessionRoles = useCallback(async () => {
    const keycloak = keycloakRef.current;
    if (!keycloak) return;

    try {
      console.log("Updating session roles...");
      await keycloak.updateToken(-1);
      const roles = keycloak.tokenParsed?.realm_access?.roles || [];
      console.log("Updated roles:", roles);

      const user = await syncUserWithRetry();
      const finalUser = { ...user, isTeacher: roles.includes("FREELANCER") };

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: keycloak.token,
          refreshToken: keycloak.refreshToken,
          roles,
          user: finalUser,
        },
      });
      setAuthToken(keycloak.token);
      saveSessionToLocalStorage(
        finalUser,
        keycloak.token,
        keycloak.refreshToken,
        roles
      );
    } catch (error) {
      console.error("Error updating session roles", error);
    }
  }, [saveSessionToLocalStorage, syncUserWithRetry]);

  const validateCurrentSession = useCallback(async () => {
    if (!state.isAuthenticated) return false;

    if (isTokenExpired()) {
      try {
        await attemptTokenRefresh();
        return true;
      } catch (error) {
        console.error("Session validation failed:", error);
        handleLogout();
        return false;
      }
    }

    return true;
  }, [
    state.isAuthenticated,
    isTokenExpired,
    attemptTokenRefresh,
    handleLogout,
  ]);

  useEffect(() => {
    setupAuthInterceptor(attemptTokenRefresh, handleLogout);
  }, [attemptTokenRefresh, handleLogout]);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const initKeycloak = async () => {
      try {
        const keycloak = new Keycloak(keycloakConfig);
        keycloakRef.current = keycloak;

        keycloak.onAuthSuccess = setupLoginFlow;
        keycloak.onAuthLogout = () => {
          clearInterval(refreshIntervalRef.current);
          clearLocalStorage();
          setAuthToken(null);
          dispatch({ type: "LOGOUT" });
        };

        await keycloak.init({
          pkceMethod: false,
          flow: "standard",
          scope: "openid email profile",
          enableLogging: true,
          checkLoginIframe: false,
        });

        dispatch({ type: "INIT_KEYCLOAK", payload: keycloak });

        if (!keycloak.authenticated) {
          const sessionLoaded = await loadSessionFromLocalStorage();
          if (!sessionLoaded) {
            dispatch({ type: "SET_LOADING", payload: false });
          }
        }
      } catch (err) {
        console.error("Keycloak init error", err);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initKeycloak();

    return () => {
      clearInterval(refreshIntervalRef.current);
    };
  }, [setupLoginFlow, loadSessionFromLocalStorage, clearLocalStorage]);

  useEffect(() => {
    if (state.isAuthenticated && state.user && state.token) {
      saveSessionToLocalStorage(
        state.user,
        state.token,
        state.refreshToken,
        state.roles
      );
    }
  }, [
    state.isAuthenticated,
    state.user,
    state.token,
    state.refreshToken,
    state.roles,
    saveSessionToLocalStorage,
  ]);

  const contextValue = useMemo(
    () => ({
      ...state,
      handleLogin,
      handleLogout,
      handleSignUp,
      updateSessionRoles,
      validateCurrentSession,
    }),
    [
      state,
      handleLogin,
      handleLogout,
      handleSignUp,
      updateSessionRoles,
      validateCurrentSession,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {state.isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading text="Initializing..." />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
