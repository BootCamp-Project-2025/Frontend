import { useEffect, useState } from "react";
import { baseAPI } from "../../../shared/api/axios/AxiosConnection";

export const UseGet = (path, id = "") => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await baseAPI.get(path + "/" + id);
        setResponseData(response.data);
        setStatus(response.statusCode);
      } catch (err) {
        setError(true);
        setResponseData(null);
        setStatus(err.status);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, [path, id]);

  return { responseData, loading, error, status };
};
