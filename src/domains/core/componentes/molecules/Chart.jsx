/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export function Chart() {
  const [data, setData] = useState([
    { month: "January", value: 10 },
    { month: "February", value: 30 },
    { month: "March", value: 50 },
    { month: "April", value: 70 },
    { month: "May", value: 20 },
    { month: "June", value: 40 },
    { month: "July", value: 60 },
  ]);

  const { showToast } = useToastContext();

  // useEffect(() => {
  //   getRequest(get)
  //     .then((response) => {
  //       if(response.success) {
  //         setData(response.data);
  //       } else {
  //         showToast(response.error.message, "error");
  //       }
  //     })
  //     .catch(err, () => {
  //       showToast(err, "error");
  //     });
  // }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffff99" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#ffff99" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend
          payload={[
            {
              value: "Grafico de Linea",
              type: "line",
              id: "ID01",
              color: "purple",
            },
          ]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="none"
          fill="url(#colorFill)"
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00aaff"
          strokeWidth={3}
          dot={{ stroke: "red", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
