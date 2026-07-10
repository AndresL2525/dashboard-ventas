import ListaPedidos from "../components/ListaPedidos";
import { pedidos } from "../data/ventas";

function Pedidos(){
    return (
        <div>
            <h1>PEDIDOS</h1>
            <p>Gestion completa de pedidos</p>
            <ListaPedidos pedidos={pedidos}/>
        </div>
    );
}

export default Pedidos;