import { useState, useEffect } from 'react';
import type { Producto } from '../types';
import './FormularioProducto.css';

interface FormularioProductoProps {
  productoEditar: Producto | null;
  onGuardar: (producto: Omit<Producto, 'id'> | Producto) => void;
  onCancelar: () => void;
}

interface FormularioData {
  nombre: string;
  categoria: string;
  unidadesVendidas: number;
  precioUnitario: number;
}

const datosVacios: FormularioData = {
  nombre: '',
  categoria: '',
  unidadesVendidas: 0,
  precioUnitario: 0,
};

function FormularioProducto({
  productoEditar,
  onGuardar,
  onCancelar,
}: FormularioProductoProps) {
  const [datos, setDatos] = useState<FormularioData>(datosVacios);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    if (productoEditar) {
      setDatos({
        nombre: productoEditar.nombre,
        categoria: productoEditar.categoria,
        unidadesVendidas: productoEditar.unidadesVendidas,
        precioUnitario: productoEditar.precioUnitario,
      });
    } else {
      setDatos(datosVacios);
    }

    setErrores([]);
  }, [productoEditar]);

  const cambiarCampo = <K extends keyof FormularioData>(
    campo: K,
    valor: FormularioData[K]
  ) => {
    setDatos((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const validar = (): string[] => {
    const erroresEncontrados: string[] = [];

    if (datos.nombre.trim() === '') {
      erroresEncontrados.push('El nombre es obligatorio.');
    }

    if (datos.categoria.trim() === '') {
      erroresEncontrados.push('La categoría es obligatoria.');
    }

    if (datos.unidadesVendidas < 0) {
      erroresEncontrados.push('Las unidades vendidas no pueden ser negativas.');
    }

    if (datos.precioUnitario <= 0) {
      erroresEncontrados.push('El precio unitario debe ser mayor que cero.');
    }

    return erroresEncontrados;
  };

  const manejarGuardar = () => {
    const erroresActuales = validar();

    if (erroresActuales.length > 0) {
      setErrores(erroresActuales);
      return;
    }

    if (productoEditar) {
      onGuardar({
        id: productoEditar.id,
        ...datos,
      });
    } else {
      onGuardar(datos);
    }
  };

  return (
    <div className="modal-fondo">
      <div className="modal-ventana">
        <h2>
          {productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>

        <div className="form-campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={datos.nombre}
            onChange={(e) => cambiarCampo('nombre', e.target.value)}
          />
        </div>

        <div className="form-campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={datos.categoria}
            onChange={(e) => cambiarCampo('categoria', e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Muebles">Muebles</option>
            <option value="Papelería">Papelería</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div className="form-campo">
          <label htmlFor="unidadesVendidas">Unidades vendidas</label>
          <input
            id="unidadesVendidas"
            type="number"
            min="0"
            value={datos.unidadesVendidas}
            onChange={(e) =>
              cambiarCampo(
                'unidadesVendidas',
                parseInt(e.target.value) || 0
              )
            }
          />
        </div>

        <div className="form-campo">
          <label htmlFor="precioUnitario">
            Precio unitario (COP)
          </label>
          <input
            id="precioUnitario"
            type="number"
            min="0"
            step="0.01"
            value={datos.precioUnitario}
            onChange={(e) =>
              cambiarCampo(
                'precioUnitario',
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>

        {errores.length > 0 && (
          <div className="form-errores">
            {errores.map((error, index) => (
              <p key={index}>⚠️ {error}</p>
            ))}
          </div>
        )}

        <div className="form-botones">
          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn-guardar"
            onClick={manejarGuardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;