import axios from "axios";
import { useEffect, useState } from "react";

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [sampleContent, setSampleContent] = useState("");
  const [formContent, setFormContent] = useState("");

  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/health`
        );
        setHealthStatus(response.data);
      } catch (error) {
        console.log(error);
        setHealthStatus("API not connected ", error);
      }
    };

    fetchHealthStatus();
  }, []);

  const saveSampleContent = async () => {
    const response = await axios.post(`${apiUrl}/api/health`, {
      content: formContent,
    });
    setSampleContent(response);
  };

  return (
    <div className="flex flex-col">
      <div>{JSON.stringify(healthStatus)}</div>
      <div className="flex flex-col">
        <div>
          <input
            className="border-black"
            type="text"
            placeholder="Type sample data"
            onChange={(e) => setFormContent(e.target.value)}
          />{" "}
          <button className="border-black" onClick={saveSampleContent}>
            Send
          </button>
        </div>
        <div>{JSON.stringify(sampleContent)}</div>
      </div>
    </div>
  );
}
