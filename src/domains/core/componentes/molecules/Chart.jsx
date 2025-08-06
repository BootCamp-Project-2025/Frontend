import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

export function Chart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#787847ff" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#787847ff" stopOpacity={0.3} />
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
          fill="#787847ff"
          fillOpacity={0.5}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#00aaff"
          strokeWidth={3}
          dot={{ stroke: "red", strokeWidth: 2, r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

Chart.propTypes = {
  data: PropTypes.array,
};
