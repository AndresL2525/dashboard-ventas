import type { Producto, Pedido } from "../types";
import type { IngresosMes } from "../types";

export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Laptop HP 15"',
    categoria: "Tecnología",
    unidadesVendidas: 5,
    precioUnitario: 2500000,
  },
  {
    id: 2,
    nombre: "Mouse inalámbrico",
    categoria: "Tecnología",
    unidadesVendidas: 12,
    precioUnitario: 45000,
  },
  {
    id: 3,
    nombre: "Teclado mecánico",
    categoria: "Tecnología",
    unidadesVendidas: 8,
    precioUnitario: 180000,
  },
  {
    id: 4,
    nombre: "Silla ergonómica",
    categoria: "Muebles",
    unidadesVendidas: 3,
    precioUnitario: 650000,
  },
  {
    id: 5,
    nombre: "Escritorio",
    categoria: "Muebles",
    unidadesVendidas: 4,
    precioUnitario: 480000,
  },
  {
    id: 6,
    nombre: "Audífonos Bluetooth",
    categoria: "Tecnología",
    unidadesVendidas: 15,
    precioUnitario: 120000,
  },
];
export const pedidos: Pedido[] = [
  { id: 1001, cliente: "Ana López", total: 2500000, estado: "entregado" },
  { id: 1002, cliente: "Carlos Pérez", total: 480000, estado: "pendiente" },
  { id: 1003, cliente: "María González", total: 180000, estado: "enviado" },
  { id: 1004, cliente: "Juan Rodríguez", total: 765000, estado: "entregado" },
  { id: 1005, cliente: "Laura Martínez", total: 120000, estado: "pendiente" },
];

export const ingresosMensuales: IngresosMes[] = [
  { mes: "Ene", ingresos: 1850000 },
  { mes: "Feb", ingresos: 2100000 },
  { mes: "Mar", ingresos: 1950000 },
  { mes: "Abr", ingresos: 2400000 },
  { mes: "May", ingresos: 2750000 },
  { mes: "Jun", ingresos: 2300000 },
  { mes: "Jul", ingresos: 2900000 },
  { mes: "Ago", ingresos: 3100000 },
  { mes: "Sep", ingresos: 2850000 },
  { mes: "Oct", ingresos: 3200000 },
  { mes: "Nov", ingresos: 3450000 },
  { mes: "Dic", ingresos: 3800000 },
];
