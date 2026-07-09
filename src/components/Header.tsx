import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

interface HeaderProps {
    notificaciones?: number;
}

function Header(props: HeaderProps) {
    const { usuario, cerrarSesion } = useAuth();
    const [menuAbierto, setMenuAbierto] = useState<boolean>(false);

    if (!usuario) return null;

    const manejarCerrarSesion = () => {
        if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
            cerrarSesion();
        }
    };

    return (
        <header className="header">
            <div className="header-busqueda">
                <input type="text" placeholder="Buscar..." />
            </div>

            <div className="header-derecha">
                <div className="header-notificaciones">
                    🔔
                    {props.notificaciones && props.notificaciones > 0 && (
                        <span className="badge">{props.notificaciones}</span>
                    )}
                </div>

                <div className="header-usuario" onClick={() => setMenuAbierto(!menuAbierto)}>
                    <div className="avatar">
                        {usuario.nombre.charAt(0)}
                    </div>

                    {menuAbierto && (
                        <div className="header-menu">
                            <div className="menu-info">
                                <strong>{usuario.nombre}</strong>
                                <div className="menu-rol">{usuario.rol}</div>
                                <div className="menu-email">{usuario.email}</div>
                            </div>
                            <button onClick={manejarCerrarSesion}>⬅️ Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
