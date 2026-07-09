import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { IngresosMes } from "../types";
import "./Graficos.css";
interface GraficoLineasProps {
  datos: IngresosMes[];
}
function GraficoLineas(props: GraficoLineasProps) {
  return (
    <div className="grafico-contenedor">
      {" "}
      <h2>Evolución mensual de ingresos</h2>{" "}
      <ResponsiveContainer width="100%" height={350}>
        {" "}
        <LineChart data={props.datos}>
          {" "}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />{" "}
          <XAxis dataKey="mes" />{" "}
          <YAxis
            tickFormatter={(valor) => "$" + (valor / 1000000).toFixed(1) + "M"}
          />{" "}
          <Tooltip
            formatter={(valor) => "$" + Number(valor).toLocaleString("es-CO")}
          />{" "}
          <Legend />{" "}
          <Line
            type="monotone"
            dataKey="ingresos"
            stroke="#2e75b6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            name="Ingresos mensuales"
          />{" "}
        </LineChart>{" "}
      </ResponsiveContainer>{" "}
    </div>
  );
}
export default GraficoLineas;
