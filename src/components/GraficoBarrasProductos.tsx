import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import type { Producto } from "../types";
import "./Graficos.css";

interface GraficoBarrasProductosProps {
  productos: Producto[];
}

function GraficoBarrasProductos(props: GraficoBarrasProductosProps) {
  // Ordenar de mayor a menor por unidades vendidas
  const datos = [...props.productos]
    .sort((a, b) => b.unidadesVendidas - a.unidadesVendidas)
    .map((producto) => ({
      nombre: producto.nombre,
      unidades: producto.unidadesVendidas
    }));

  return (
    <div className="grafico-contenedor">
      <h2>Unidades vendidas por producto</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={datos}
          layout="vertical"
          margin={{ left: 100 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e0e0e0"
          />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="nombre"
            width={100}
          />

          <Tooltip />

          <Bar
            dataKey="unidades"
            fill="#27ae60"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoBarrasProductos;