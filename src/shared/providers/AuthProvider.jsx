import Keycloak from "keycloak-js";
import { syncUser } from "../api/AuthApi";
import { setAuthToken } from "../api/axios/AxiosConnection";
import { useRef, useReducer, useEffect, useCallback, useMemo } from "react";
import AuthContext from "../contexts/AuthContext";
import PropTypes from "prop-types";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: "",
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

function authReducer(state, action) {
  switch (action.type) {
    case "INIT_KEYCLOAK":
      return { ...state, keycloak: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        roles: action.payload.roles,
        user: action.payload.user,
        isLoading: false,
      };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
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
    keycloakRef.current?.logout();
    clearInterval(refreshIntervalRef.current);
    dispatch({ type: "LOGOUT" });
  }, []);

  const setupLoginFlow = useCallback(async () => {
    const keycloak = keycloakRef.current;
    if (!keycloak) return;

    const roles = keycloak.tokenParsed?.realm_access?.roles || [];
    const token = keycloak.token;

    setAuthToken(token);

    try {
      const user = await syncUser();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token,
          roles,
          user: { ...user, isTeacher: roles.includes("FREELANCER") },
        },
      });
    } catch (error) {
      console.error("Error syncing user", error);
    }

    refreshIntervalRef.current = setInterval(() => {
      keycloak
        .updateToken(30)
        .then(() => {
          dispatch({ type: "SET_TOKEN", payload: keycloak.token });
          setAuthToken(keycloak.token);
        })
        .catch((err) => {
          console.error("Token update failed", err);
        });
    }, 60000);
  }, []);

  const updateSessionRoles = useCallback(async (roles, route) => {
    const keycloak = keycloakRef.current;
    if (!keycloak) return;
    try {
      await keycloak.logout();
      await keycloak.login({
        prompt: "none",
        redirectUri: window.location.origin + route,
      });
      const user = await syncUser();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: keycloak.token, roles, user },
      });
    } catch (error) {
      console.error("Error updating session roles", error);
    }
  }, []);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const initKeycloak = async () => {
      const keycloak = new Keycloak(keycloakConfig);
      keycloakRef.current = keycloak;

      keycloak.onAuthSuccess = setupLoginFlow;
      keycloak.onAuthLogout = () => {
        clearInterval(refreshIntervalRef.current);
        dispatch({ type: "LOGOUT" });
      };

      try {
        await keycloak.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
        });

        dispatch({ type: "INIT_KEYCLOAK", payload: keycloak });

        if (!keycloak.authenticated) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (err) {
        console.error("Keycloak init error", err);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initKeycloak();

    return () => clearInterval(refreshIntervalRef.current);
  }, [setupLoginFlow]);

  const contextValue = useMemo(
    () => ({
      ...state,
      handleLogin,
      handleLogout,
      handleSignUp,
      updateSessionRoles,
    }),
    [state, handleLogin, handleLogout, handleSignUp, updateSessionRoles]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
