import { useState } from 'react';
import GraficoBarrasProductos from '../components/GraficoBarrasProductos';
import FormularioProducto from '../components/FormularioProducto';
import type { Producto } from '../types';
import { useAuth } from '../context/AuthContext';
import './Productos.css';

interface ProductosProps {
  productos: Producto[];
  onAgregar: (nuevo: Omit<Producto, 'id'>) => void;
  onActualizar: (producto: Producto) => void;
  onEliminar: (id: number) => void;
  onRestablecer: () => void;
}

function Productos({
  productos,
  onAgregar,
  onActualizar,
  onEliminar,
  onRestablecer,
}: ProductosProps) {
  const { tienePermiso } = useAuth();
  const puedeEditar = tienePermiso(['administrador', 'vendedor']);

  const [mostrarFormulario, setMostrarFormulario] =
    useState<boolean>(false);

  const [productoEditar, setProductoEditar] =
    useState<Producto | null>(null);

  const abrirNuevo = () => {
    setProductoEditar(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto: Producto) => {
    setProductoEditar(producto);
    setMostrarFormulario(true);
  };

  const guardarProducto = (
    datos: Omit<Producto, 'id'> | Producto
  ) => {
    if ('id' in datos) {
      onActualizar(datos);
    } else {
      onAgregar(datos);
    }

    setMostrarFormulario(false);
    setProductoEditar(null);
  };

  const confirmarYEliminar = (producto: Producto) => {
    const confirmado = window.confirm(
      `Está a punto de eliminar el producto "${producto.nombre}". ¿Continuar?`
    );

    if (confirmado) {
      onEliminar(producto.id);
    }
  };

  return (
    <div className="productos">
      <div className="productos-header">
        <h1>Productos</h1>

        {puedeEditar && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-restablecer" onClick={onRestablecer}>
              ↻ Restablecer
            </button>
            <button className="btn-nuevo" onClick={abrirNuevo}>
              + Nuevo Producto
            </button>
          </div>
        )}
      </div>

      <p>
        Gestión completa de productos vendidos.
        {!puedeEditar && (
          <span className="aviso-solo-lectura"> (Modo solo lectura)</span>
        )}
      </p>

      <GraficoBarrasProductos productos={productos} />

      <div className="tabla-contenedor">
        <h2>Listado de Productos</h2>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Unidades</th>
              <th>Precio</th>
              <th>Total Ventas</th>
              {puedeEditar && <th>Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan={puedeEditar ? 6 : 5}>
                  No hay productos registrados.
                </td>
              </tr>
            ) : (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>

                  <td>{producto.categoria}</td>

                  <td>{producto.unidadesVendidas}</td>

                  <td>
                    $
                    {producto.precioUnitario.toLocaleString(
                      'es-CO'
                    )}
                  </td>

                  <td>
                    $
                    {(
                      producto.unidadesVendidas *
                      producto.precioUnitario
                    ).toLocaleString('es-CO')}
                  </td>

                  {puedeEditar && (
                    <td>
                      <button
                        className="btn-editar"
                        onClick={() =>
                          abrirEditar(producto)
                        }
                      >
                        ✏️
                      </button>

                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          confirmarYEliminar(producto)
                        }
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && puedeEditar && (
        <FormularioProducto
          productoEditar={productoEditar}
          onGuardar={guardarProducto}
          onCancelar={() => {
            setMostrarFormulario(false);
            setProductoEditar(null);
          }}
        />
      )}
    </div>
  );
}

export default Productos;
