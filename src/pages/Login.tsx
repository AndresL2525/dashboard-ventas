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
      <div className="auth-tarjeta">
        <div className="auth-avatar">👤</div>

        <h2>Iniciar sesión</h2>
        <p className="auth-subtitulo">
          Ingrese sus credenciales para continuar
        </p>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <div className="auth-campo">
          <label>Email ID</label>
          <div className="auth-campo-icono" data-icon="✉️">
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
          LOGIN
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
  );
}

export default Login;
