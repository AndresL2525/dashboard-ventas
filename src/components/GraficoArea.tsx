import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import type { IngresosMes } from "../types";
import "./Graficos.css";

interface GraficoAreaProps {
  datos: IngresosMes[];
}

function GraficoArea(props: GraficoAreaProps) {
  // Calcular ingresos acumulados
  let acumulado = 0;

  const datosAcumulados = props.datos.map((item) => {
    acumulado += item.ingresos;

    return {
      mes: item.mes,
      acumulado
    };
  });

  return (
    <div className="grafico-contenedor">
      <h2>Ingresos acumulados en el año</h2>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={datosAcumulados}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e0e0e0"
          />

          <XAxis dataKey="mes" />

          <YAxis
            tickFormatter={(valor) =>
              "$" + (valor / 1000000).toFixed(0) + "M"
            }
          />

          <Tooltip
            formatter={(valor) => "$" + Number (valor).toLocaleString("es-CO")
            }
          />

          <Area
            type="monotone"
            dataKey="acumulado"
            stroke="#27ae60"
            fill="#27ae60"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoArea;