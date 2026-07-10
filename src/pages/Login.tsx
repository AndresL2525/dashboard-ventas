import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

interface LoginProps {
  onIrARegistro: () => void;
}

function Login(props: LoginProps) {
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [recuerdame, setRecuerdame] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const manejarEnvio = () => {
    setError("");
    if (email.trim() === "" || password.trim() === "") {
      setError("Complete todos los campos.");
      return;
    }
    const resultado = iniciarSesion(email, password);
    if (!resultado.ok) {
      setError(resultado.mensaje);
    }
  };

  const manejarTecla = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      manejarEnvio();
    }
  };

  return (
    <div className="auth-fondo">
      {/* Header */}
      <div className="auth-header">
        <div className="auth-header-logo">
          <span className="auth-logo-icono">🛒</span>
          <span className="auth-logo-texto">Ventas APP</span>
        </div>
        <nav className="auth-header-nav">
          <a href="#home">Home</a>
          <a href="#profile">Perfil</a>
          <a href="#about">Acerca</a>
          <a href="#portfolio">Portafolio</a>
          <a href="#contact">Contacto</a>
        </nav>
      </div>

      {/* Contenedor Principal */}
      <div className="auth-contenedor">
        {/* Columna Izquierda - Formulario */}
        <div className="auth-columna-izq">
          <div className="auth-tarjeta">
            <h1 className="auth-titulo">BIENVENIDO</h1>

            {error && <div className="auth-error">⚠️ {error}</div>}

            <div className="auth-campo">
              <label>Usuario</label>
              <div className="auth-campo-icono" data-icon="👤">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={manejarTecla}
                  placeholder="usuario@example.com"
                />
              </div>
            </div>

            <div className="auth-campo">
              <label>Contraseña</label>
              <div className="auth-campo-icono" data-icon="🔒">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={manejarTecla}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="auth-opciones">
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  checked={recuerdame}
                  onChange={(e) => setRecuerdame(e.target.checked)}
                />
                <span>Recuérdame</span>
              </label>
              <a
                href="#"
                className="auth-olvide"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Función de recuperación próximamente");
                }}
              >
                ¿Olvidó contraseña?
              </a>
            </div>

            <button className="auth-boton-principal" onClick={manejarEnvio}>
              ENTRAR
            </button>

            <div className="auth-separador">¿No tiene cuenta?</div>

            <button className="auth-boton-secundario" onClick={props.onIrARegistro}>
              Crear cuenta nueva
            </button>

            <div className="auth-ayuda">
              <p>
                <strong>Usuarios de prueba:</strong>
              </p>
              <p>admin@ventas.com / admin123</p>
              <p>vendedor@ventas.com / vendedor123</p>
              <p>visor@ventas.com / visor123</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Decoración */}
        <div className="auth-columna-der">
          <div className="auth-decoracion">
            {/* Header de decoración */}
            <div className="auth-deco-header">
              <div className="auth-deco-dot"></div>
              <div className="auth-deco-dot"></div>
              <div className="auth-deco-dot"></div>
            </div>

            {/* Contenido de decoración */}
            <div className="auth-deco-contenido">
              <div className="auth-deco-icono">🔐</div>
              <div className="auth-deco-campos">
                <div className="auth-deco-campo">
                  <span className="auth-deco-icono-mini">👤</span>
                  <span>XXXXXXXX</span>
                </div>
                <div className="auth-deco-campo">
                  <span className="auth-deco-icono-mini">🔒</span>
                  <span>••••••••</span>
                </div>
              </div>
            </div>

            {/* Ilustración - Avatar */}
            <div className="auth-deco-avatar">
              <div className="auth-avatar-grande">👤</div>
            </div>

            {/* Iconos de seguridad */}
            <div className="auth-deco-iconos">
              <div className="auth-deco-icon-item">🔐</div>
              <div className="auth-deco-icon-item">🔑</div>
              <div className="auth-deco-icon-item">🌐</div>
              <div className="auth-deco-icon-item">⚙️</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;