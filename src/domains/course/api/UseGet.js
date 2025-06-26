import { useEffect, useState } from "react";
import { baseAPI } from "../axios/AxiosConnection";

export const UseGet = (path, id = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await baseAPI.get(path + "/" + id);
        setData(response.data);
        setStatus(response.statusCode);
      } catch (err) {
        setError(true);
        setData(null);
        setStatus(err.status);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, [path, id]);

  return { data, loading, error, status };
};
