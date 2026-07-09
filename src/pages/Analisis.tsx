import GraficoLineas from "../components/GraficoLineas";
import GraficoArea from "../components/GraficoArea";
import { ingresosMensuales } from "../data/ventas";
function Analisis() {
  return (
    <div>
      {" "}
      <h1>Análisis</h1>{" "}
      <p>Tendencias y evolución de los indicadores en el tiempo.</p>{" "}
      <GraficoLineas datos={ingresosMensuales} />{" "}
      <GraficoArea datos={ingresosMensuales} />{" "}
    </div>
  );
}
export default Analisis;
