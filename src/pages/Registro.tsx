import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

interface RegistroProps {
  onIrALogin: () => void;
}

interface DatosRegistro {
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: string;
}

const datosVacios: DatosRegistro = {
  nombre: "",
  email: "",
  password: "",
  confirmarPassword: "",
};

function Registro(props: RegistroProps) {
  const { registrarUsuario } = useAuth();
  const [datos, setDatos] = useState<DatosRegistro>(datosVacios);
  const [error, setError] = useState<string>("");
  const [exito, setExito] = useState<string>("");

  const cambiar = (campo: keyof DatosRegistro, valor: string) => {
    setDatos({ ...datos, [campo]: valor });
  };

  const validar = (): string | null => {
    if (datos.nombre.trim() === "") return "El nombre es obligatorio.";
    if (datos.email.trim() === "") return "El email es obligatorio.";
    if (!datos.email.includes("@")) return "Email inválido.";
    if (datos.password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (datos.password !== datos.confirmarPassword)
      return "Las contraseñas no coinciden.";
    return null;
  };

  const manejarRegistro = () => {
    setError("");
    setExito("");
    const errorValidacion = validar();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    // El registro público siempre crea la cuenta con el rol de menor
    // privilegio. Solo un administrador puede promover a otros roles
    // desde la sección de Usuarios. Nunca se permite elegir el rol aquí.
    const resultado = registrarUsuario({
      nombre: datos.nombre,
      email: datos.email,
      password: datos.password,
      rol: "visualizador",
    });

    if (resultado.ok) {
      setExito(resultado.mensaje + " Ya puede iniciar sesión.");
      setDatos(datosVacios);
    } else {
      setError(resultado.mensaje);
    }
  };

  return (
    <div className="auth-fondo">
      <div className="auth-tarjeta">
        <div className="auth-logo">📊 VentasApp</div>
        <h2>Crear cuenta</h2>
        <p className="auth-subtitulo">Complete los campos para registrarse</p>

        <div className="auth-campo">
          <label>Nombre completo</label>
          <input
            type="text"
            value={datos.nombre}
            onChange={(e) => cambiar("nombre", e.target.value)}
          />
        </div>

        <div className="auth-campo">
          <label>Email</label>
          <input
            type="email"
            value={datos.email}
            onChange={(e) => cambiar("email", e.target.value)}
          />
        </div>

        <div className="auth-campo">
          <label>Contraseña</label>
          <input
            type="password"
            value={datos.password}
            onChange={(e) => cambiar("password", e.target.value)}
          />
        </div>

        <div className="auth-campo">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={datos.confirmarPassword}
            onChange={(e) => cambiar("confirmarPassword", e.target.value)}
          />
        </div>

        {error && <div className="auth-error">⚠️ {error}</div>}
        {exito && <div className="auth-exito">✓ {exito}</div>}

        <button className="auth-boton-principal" onClick={manejarRegistro}>
          Registrarme
        </button>

        <div className="auth-separador">¿Ya tiene cuenta?</div>

        <button className="auth-boton-secundario" onClick={props.onIrALogin}>
          Volver al login
        </button>
      </div>
    </div>
  );
}

export default Registro;
