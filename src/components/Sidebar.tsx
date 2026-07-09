import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types';
import './Sidebar.css';

export type SeccionId =
  | 'inicio'
  | 'analisis'
  | 'productos'
  | 'pedidos'
  | 'configuracion'
  | 'usuarios';

interface ItemMenu {
  id: SeccionId;
  icono: string;
  texto: string;
  rolesPermitidos: Rol[];
}

interface SidebarProps {
  seccionActiva: SeccionId;
  onSeleccionarSeccion: (seccion: SeccionId) => void;
}

const menuCompleto: ItemMenu[] = [
  { id: 'inicio', icono: '🏘️', texto: 'Inicio', rolesPermitidos: ['administrador', 'vendedor', 'visualizador'] },
  { id: 'productos', icono: '🛒', texto: 'Productos', rolesPermitidos: ['administrador', 'vendedor', 'visualizador'] },
  { id: 'pedidos', icono: '📦', texto: 'Pedidos', rolesPermitidos: ['administrador', 'vendedor', 'visualizador'] },
  { id: 'analisis', icono: '📊', texto: 'Análisis', rolesPermitidos: ['administrador', 'visualizador'] },
  { id: 'configuracion', icono: '⚙️', texto: 'Configuración', rolesPermitidos: ['administrador'] },
  { id: 'usuarios', icono: '👤', texto: 'Usuarios', rolesPermitidos: ['administrador'] }
];

function Sidebar(props: SidebarProps) {
  const { usuario, tienePermiso } = useAuth();

  if (!usuario) return null;

  // Filtrar el menú según los permisos del usuario actual
  const menuVisible = menuCompleto.filter((item) =>
    tienePermiso(item.rolesPermitidos)
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
         <span>Ventas APP</span>
      </div>

      <nav>
        <ul>
          {menuVisible.map((item) => (
            <li
              key={item.id}
              className={item.id === props.seccionActiva ? 'activo' : ''}
              onClick={() => props.onSeleccionarSeccion(item.id)}
            >
              <span className="icono">{item.icono}</span>
              <span className="texto">{item.texto}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-usuario">
        <div className="usuario-avatar">{usuario.nombre.charAt(0)}</div>
        <div className="usuario-info">
          <div className="usuario-nombre">{usuario.nombre}</div>
          <div className="usuario-rol">{usuario.rol}</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
