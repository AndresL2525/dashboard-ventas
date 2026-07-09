import type { Producto } from "../types";
import './TablaProductos.css';

interface TablaProductosProps {productos: Producto[];}

function TablaProductos (props: TablaProductosProps){
    return (
        <div className="tabla-contenedor">
            <h2>Productos mas vendidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoria</th>
                        <th>Unidades</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {props.productos.map((producto) =>(
                        <tr key = {producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.unidadesVendidas}</td>
                            <td>${(producto.unidadesVendidas *producto.precioUnitario).toLocaleString('es-CO')}</td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>        
        </div>
    )
}

export default TablaProductos;