import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './AuthContext';

// Envuelve el hook con el Provider real para ejercitar la lógica completa.
function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

function render() {
  return renderHook(() => useAuth(), { wrapper });
}

describe('AuthContext', () => {
  describe('iniciarSesion', () => {
    it('inicia sesión con credenciales válidas y expone la sesión sin password', () => {
      const { result } = render();

      let respuesta!: { ok: boolean; mensaje: string };
      act(() => {
        respuesta = result.current.iniciarSesion('admin@ventas.com', 'admin123');
      });

      expect(respuesta.ok).toBe(true);
      expect(result.current.usuario).not.toBeNull();
      expect(result.current.usuario?.rol).toBe('administrador');
      // La sesión no debe contener la contraseña.
      expect(result.current.usuario).not.toHaveProperty('password');
    });

    it('el email es insensible a mayúsculas', () => {
      const { result } = render();

      let respuesta!: { ok: boolean };
      act(() => {
        respuesta = result.current.iniciarSesion('ADMIN@Ventas.com', 'admin123');
      });

      expect(respuesta.ok).toBe(true);
    });

    it('rechaza una contraseña incorrecta', () => {
      const { result } = render();

      let respuesta!: { ok: boolean };
      act(() => {
        respuesta = result.current.iniciarSesion('admin@ventas.com', 'mala');
      });

      expect(respuesta.ok).toBe(false);
      expect(result.current.usuario).toBeNull();
    });
  });

  describe('registrarUsuario', () => {
    it('registra un usuario nuevo', () => {
      const { result } = render();

      let respuesta!: { ok: boolean };
      act(() => {
        respuesta = result.current.registrarUsuario({
          nombre: 'Nuevo',
          email: 'nuevo@ventas.com',
          password: 'clave123',
          rol: 'visualizador',
        });
      });

      expect(respuesta.ok).toBe(true);
      expect(result.current.usuarios.some((u) => u.email === 'nuevo@ventas.com')).toBe(true);
    });

    it('rechaza un email duplicado', () => {
      const { result } = render();

      let respuesta!: { ok: boolean };
      act(() => {
        respuesta = result.current.registrarUsuario({
          nombre: 'Otro Admin',
          email: 'admin@ventas.com',
          password: 'clave123',
          rol: 'visualizador',
        });
      });

      expect(respuesta.ok).toBe(false);
    });
  });

  describe('tienePermiso', () => {
    it('sin sesión no tiene ningún permiso', () => {
      const { result } = render();
      expect(result.current.tienePermiso(['administrador'])).toBe(false);
    });

    it('un vendedor no tiene permisos de administrador', () => {
      const { result } = render();

      act(() => {
        result.current.iniciarSesion('vendedor@ventas.com', 'vendedor123');
      });

      expect(result.current.tienePermiso(['administrador'])).toBe(false);
      expect(result.current.tienePermiso(['administrador', 'vendedor'])).toBe(true);
    });
  });

  describe('eliminarUsuario', () => {
    it('un no-administrador no puede eliminar usuarios', () => {
      const { result } = render();

      act(() => {
        result.current.iniciarSesion('vendedor@ventas.com', 'vendedor123');
      });

      let respuesta!: { ok: boolean };
      act(() => {
        respuesta = result.current.eliminarUsuario(1);
      });

      expect(respuesta.ok).toBe(false);
    });

    it('un administrador no puede eliminar su propia cuenta', () => {
      const { result } = render();

      act(() => {
        result.current.iniciarSesion('admin@ventas.com', 'admin123');
      });
      const propioId = result.current.usuario!.id;

      let respuesta!: { ok: boolean };
      act(() => {
        respuesta = result.current.eliminarUsuario(propioId);
      });

      expect(respuesta.ok).toBe(false);
    });

    it('un administrador puede eliminar a otro usuario', () => {
      const { result } = render();

      act(() => {
        result.current.iniciarSesion('admin@ventas.com', 'admin123');
      });

      let respuesta!: { ok: boolean };
      act(() => {
        respuesta = result.current.eliminarUsuario(3);
      });

      expect(respuesta.ok).toBe(true);
      expect(result.current.usuarios.some((u) => u.id === 3)).toBe(false);
    });
  });
});
