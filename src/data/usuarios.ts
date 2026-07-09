import type { Usuario } from '../types';

export const usuariosIniciales: Usuario[] = [
  {
    id: 1,
    nombre: 'Andres Admin',
    email: 'admin@ventas.com',
    password: 'admin123',
    rol: 'administrador'
  },
  {
    id: 2,
    nombre: 'Cristian Vendedor',
    email: 'vendedor@ventas.com',
    password: 'vendedor123',
    rol: 'vendedor'
  },
  {
    id: 3,
    nombre: 'Juan Visualizador',
    email: 'visor@ventas.com',
    password: 'visor123',
    rol: 'visualizador'
  }
];
