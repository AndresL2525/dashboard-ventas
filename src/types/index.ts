export interface Producto{
    id: number;
    nombre: string;
    categoria: string;
    unidadesVendidas: number;
    precioUnitario: number;
    
}

export interface Pedido {
    id: number;
    cliente: string;
    total: number;
    estado: 'pendiente' | 'enviado' | 'entregado';
}

export interface IngresosMes {
    mes: string;
    ingresos: number;
}

export type Rol = 'administrador' | 'vendedor' | 'visualizador';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string; // En producción esto sería un hash, no texto plano
  rol: Rol;
}

// Usuario que se expone al resto de la app (sin password)
export type UsuarioSesion = Omit<Usuario, 'password'>;

