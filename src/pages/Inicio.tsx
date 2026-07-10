import { useState, useEffect } from "react";
import TarjetaKPI from "../components/TarjetaKPI";
import TablaProductos from "../components/TablaProductos";
import ListaPedidos from "../components/ListaPedidos";
import GraficoBarrasCategoria from "../components/GraficosBarrasCategorias";
import GraficoCircularEstados from "../components/GraficoCircularEstados";
import { pedidos } from "../data/ventas";
import type { Producto } from "../types";

interface InicioProps {
  productos: Producto[];
}



function Inicio(props: InicioProps) {
  const [ingresos, setIngresos] = useState<number>(0);
  const [totalPedidos, setTotalPedidos] = useState<number>(0);
  const [ticketPromedio, setTicketPromedio] = useState<number>(0);
  useEffect(() => {
    const sumaIngresos = pedidos.reduce((acumulado, pedido) => {
      return acumulado + pedido.total;
    }, 0);
    setIngresos(sumaIngresos);
    setTotalPedidos(pedidos.length);
    setTicketPromedio(sumaIngresos / pedidos.length);
  }, []);
  const formatearMoneda = (valor: number): string => {
    return "$" + valor.toLocaleString("es-CO");
  };
  return (
    <div>
      {" "}
      <h1>Inicio</h1>{" "}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {" "}
        <TarjetaKPI
          titulo="Ingresos totales"
          valor={formatearMoneda(ingresos)}
          color="#27ae60"
        />{" "}
        <TarjetaKPI
          titulo="Pedidos"
          valor={totalPedidos.toString()}
          color="#2e75b6"
        />{" "}
        <TarjetaKPI
          titulo="Ticket promedio"
          valor={formatearMoneda(Math.round(ticketPromedio))}
          color="#e67e22"
        />{" "}
      </div>{" "}
      <div className="graficos-fila">
        {" "}
        <GraficoBarrasCategoria productos={props.productos} />{" "}
        <GraficoCircularEstados pedidos={pedidos} />{" "}
      </div>{" "}
      <TablaProductos productos={props.productos} />{" "}
      <ListaPedidos pedidos={pedidos} />{" "}
    </div>
  );
}
export default Inicio;
