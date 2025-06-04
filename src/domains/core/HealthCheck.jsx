import axios from "axios";
import { useEffect, useState } from "react";

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BASE_API_URL;
    const fetchHealthStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/health`);
        setHealthStatus(response.data);
      } catch (error) {
        console.log(error);
        setHealthStatus("API not connected ", error);
      }
    };

    fetchHealthStatus();
  }, []);
  return <div>{JSON.stringify(healthStatus)}</div>;
}
