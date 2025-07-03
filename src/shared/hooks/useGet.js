import { useEffect, useState } from "react";
import { baseAPI } from "../api/axios/AxiosConnection";

export const useGet = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: false,
    status: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseAPI.get(url);
        setState({
          data: response.data,
          loading: false,
          error: false,
          status: response.statusCode ?? response.status,
        });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: true,
          status: err?.response?.status || null,
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
};
