import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Rol } from "../types";
import "./Auth.css";

interface RegistroProps {
  onIrALogin: () => void;
}

interface DatosRegistro {
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: string;
  rol: Rol;
}

const datosVacios: DatosRegistro = {
  nombre: "",
  email: "",
  password: "",
  confirmarPassword: "",
  rol: "visualizador",
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

    const resultado = registrarUsuario({
      nombre: datos.nombre,
      email: datos.email,
      password: datos.password,
      rol: datos.rol,
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

        <div className="auth-campo">
          <label>Rol</label>
          <select
            value={datos.rol}
            onChange={(e) => cambiar("rol", e.target.value as Rol)}
          >
            <option value="visualizador">Visualizador</option>
            <option value="vendedor">Vendedor</option>
            <option value="administrador">Administrador</option>
          </select>
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
