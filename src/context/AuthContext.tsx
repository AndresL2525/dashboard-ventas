import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Usuario, UsuarioSesion, Rol } from '../types';
import { usuariosIniciales } from '../data/usuarios';

// 1. Definir QUÉ tendrá el contexto
interface AuthContextType {
  usuario: UsuarioSesion | null;
  iniciarSesion: (email: string, password: string) => { ok: boolean; mensaje: string };
  cerrarSesion: () => void;
  registrarUsuario: (nuevo: Omit<Usuario, 'id'>) => { ok: boolean; mensaje: string };
  usuarios: Usuario[];
  tienePermiso: (rolesPermitidos: Rol[]) => boolean;
  eliminarUsuario: (id: number) => { ok: boolean; mensaje: string };
  cambiarRolUsuario: (id: number, nuevoRol: Rol) => { ok: boolean; mensaje: string };
}

// 2. Crear el contexto con un valor inicial (será reemplazado por el Provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clave para localStorage
const CLAVE_USUARIOS = 'dashboard-usuarios';
const CLAVE_SESION = 'dashboard-sesion';

// 3. Crear el Provider: el componente que envuelve la app y expone el contexto
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  // Cargar usuarios desde localStorage, o usar la lista inicial
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);
    if (guardados) {
      try {
        return JSON.parse(guardados) as Usuario[];
      } catch {
        return usuariosIniciales;
      }
    }
    return usuariosIniciales;
  });

  // Cargar sesión actual desde localStorage
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(() => {
    const guardada = localStorage.getItem(CLAVE_SESION);
    if (guardada) {
      try {
        return JSON.parse(guardada) as UsuarioSesion;
      } catch {
        return null;
      }
    }
    return null;
  });

  // Persistir usuarios cuando cambien
  useEffect(() => {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  }, [usuarios]);

  // Persistir sesión cuando cambie
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CLAVE_SESION);
    }
  }, [usuario]);

  // Función para iniciar sesión
  const iniciarSesion = (email: string, password: string) => {
    const encontrado = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!encontrado) {
      return { ok: false, mensaje: 'Email o contraseña incorrectos.' };
    }

    // Crear sesión SIN el campo password
    const sesion: UsuarioSesion = {
      id: encontrado.id,
      nombre: encontrado.nombre,
      email: encontrado.email,
      rol: encontrado.rol
    };
    setUsuario(sesion);
    return { ok: true, mensaje: 'Bienvenido, ' + encontrado.nombre };
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
  };

  // Función para registrar un nuevo usuario
  const registrarUsuario = (nuevo: Omit<Usuario, 'id'>) => {
    // Validar que el email no exista
    const yaExiste = usuarios.some(
      (u) => u.email.toLowerCase() === nuevo.email.toLowerCase()
    );
    if (yaExiste) {
      return { ok: false, mensaje: 'Ya existe un usuario con ese email.' };
    }

    const nuevoId = usuarios.length > 0
      ? Math.max(...usuarios.map((u) => u.id)) + 1
      : 1;

    const usuarioCompleto: Usuario = { ...nuevo, id: nuevoId };
    setUsuarios([...usuarios, usuarioCompleto]);
    return { ok: true, mensaje: 'Usuario registrado correctamente.' };
  };

  // Función auxiliar para verificar permisos
  const tienePermiso = (rolesPermitidos: Rol[]): boolean => {
    if (!usuario) return false;
    return rolesPermitidos.includes(usuario.rol);
  };

  // Eliminar un usuario (solo administradores, y nunca a sí mismo)
  const eliminarUsuario = (id: number) => {
    if (!usuario || usuario.rol !== 'administrador') {
      return { ok: false, mensaje: 'No tiene permisos para eliminar usuarios.' };
    }
    if (id === usuario.id) {
      return { ok: false, mensaje: 'No puede eliminar su propia cuenta.' };
    }
    setUsuarios(usuarios.filter((u) => u.id !== id));
    return { ok: true, mensaje: 'Usuario eliminado correctamente.' };
  };

  // Cambiar el rol de un usuario (solo administradores)
  const cambiarRolUsuario = (id: number, nuevoRol: Rol) => {
    if (!usuario || usuario.rol !== 'administrador') {
      return { ok: false, mensaje: 'No tiene permisos para cambiar roles.' };
    }
    setUsuarios(usuarios.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u)));
    return { ok: true, mensaje: 'Rol actualizado correctamente.' };
  };

  const valor: AuthContextType = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    registrarUsuario,
    usuarios,
    tienePermiso,
    eliminarUsuario,
    cambiarRolUsuario
  };

  return (
    <AuthContext.Provider value={valor}>
      {props.children}
    </AuthContext.Provider>
  );
}

// 4. Custom hook para consumir el contexto fácilmente
export function useAuth(): AuthContextType {
  const contexto = useContext(AuthContext);
  if (contexto === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return contexto;
}
