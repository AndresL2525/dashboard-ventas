import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types';
import './Usuarios.css';

const roles: Rol[] = ['administrador', 'vendedor', 'visualizador'];

function Usuarios() {
  const { usuario, usuarios, eliminarUsuario, cambiarRolUsuario } = useAuth();

  if (!usuario) return null;

  const manejarEliminar = (id: number, nombre: string) => {
    if (id === usuario.id) {
      window.alert('No puede eliminar su propia cuenta.');
      return;
    }
    const confirmado = window.confirm(
      `Está a punto de eliminar al usuario "${nombre}". ¿Continuar?`
    );
    if (confirmado) {
      const resultado = eliminarUsuario(id);
      if (!resultado.ok) {
        window.alert(resultado.mensaje);
      }
    }
  };

  const manejarCambiarRol = (id: number, nuevoRol: Rol) => {
    cambiarRolUsuario(id, nuevoRol);
  };

  return (
    <div className="usuarios">
      <div className="usuarios-header">
        <h1>Usuarios</h1>
      </div>

      <p>Gestión de usuarios del sistema. Solo visible para administradores.</p>

      <div className="tabla-contenedor">
        <h2>Listado de usuarios</h2>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.nombre}
                  {u.id === usuario.id && (
                    <span className="etiqueta-vos">(usted)</span>
                  )}
                </td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.rol}
                    onChange={(e) =>
                      manejarCambiarRol(u.id, e.target.value as Rol)
                    }
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn-eliminar"
                    disabled={u.id === usuario.id}
                    onClick={() => manejarEliminar(u.id, u.nombre)}
                    title={
                      u.id === usuario.id
                        ? 'No puede eliminar su propia cuenta'
                        : 'Eliminar usuario'
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
