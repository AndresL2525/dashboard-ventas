import type { Pedido } from "../types";
import "./ListaPedidos.css";

interface ListaPedidosProps{
    pedidos: Pedido[];
}

function obtenerColorEstado(estado: Pedido["estado"]):string{

    if(estado === "entregado")return "#27ae60";
    if(estado === "enviado")return "#2e75b6";
    return "#e67e22"
    
}

function ListaPedidos(props: ListaPedidosProps){
    return (
        <div className="lista-pedidos">
            {" "}
            <h2>Pedidos Recientes</h2>{" "}
            <ul>
                {" "}
                {props.pedidos.map((pedido)=>(
                    <li key={pedido.id}>
                        {" "}
                        <span className="pedido-id">#{pedido.id}</span>{" "}
                        <span className="pedido-cliente">#{pedido.cliente}</span>{" "}
                        <span className="pedido-estado" style={{backgroundColor:
                            obtenerColorEstado(pedido.estado)}}>{" "}
                            {pedido.estado}{" "}
                            </span>
                    </li>
                ))}{" "}
            </ul>{" "}
        </div>
        

    );
    
}
export default ListaPedidos;
