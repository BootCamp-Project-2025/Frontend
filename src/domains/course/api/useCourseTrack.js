import { useEffect, useState } from "react";

export const useCourseTrack = (path, id = "") => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await fetch(`/${path}.json`);
        setStatus(response.status);

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        setResponseData(data);
      } catch (err) {
        setError(true);
        setResponseData(null);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, [path, id]);

  return { responseData, loading, error, status };
};
