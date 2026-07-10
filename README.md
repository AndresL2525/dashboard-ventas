# Dashboard de Ventas

Aplicación de tablero (dashboard) de ventas construida como **SPA** con **React 19 + TypeScript + Vite**. Permite iniciar sesión, visualizar KPIs, productos, pedidos, gráficos de análisis y gestionar usuarios según su rol.

> ⚠️ **Proyecto de práctica / demostración.** La autenticación y autorización se resuelven **por completo en el navegador** y los datos son estáticos o se guardan en `localStorage`. **No es apto para producción tal cual.** Ver [Limitaciones conocidas](#limitaciones-conocidas).

## Tecnologías

- **React 19** + **TypeScript**
- **Vite** (dev server, build)
- **Recharts** para los gráficos
- **ESLint** + **React Doctor** (CI) para calidad

## Requisitos

- Node.js 18+ y npm

## Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción (tsc + vite build)
npm run preview  # previsualizar el build
npm run lint     # ejecutar ESLint
```

## Usuarios de prueba

| Rol            | Email                | Contraseña   |
|----------------|----------------------|--------------|
| Administrador  | admin@ventas.com     | admin123     |
| Vendedor       | vendedor@ventas.com  | vendedor123  |
| Visualizador   | visor@ventas.com     | visor123     |

Estas credenciales son solo para desarrollo y están definidas en `src/data/usuarios.ts`.

## Roles y permisos

| Sección       | Administrador | Vendedor | Visualizador |
|---------------|:-------------:|:--------:|:------------:|
| Inicio        | ✅ | ✅ | ✅ |
| Productos     | ✅ | ✅ | ✅ |
| Pedidos       | ✅ | ✅ | ✅ |
| Análisis      | ✅ | ❌ | ✅ |
| Configuración | ✅ | ❌ | ❌ |
| Usuarios      | ✅ | ❌ | ❌ |

El registro público siempre crea la cuenta con rol **Visualizador**; solo un administrador puede promover a otros roles desde la sección **Usuarios**.

## Estructura del proyecto

```
src/
├── App.tsx                 # Layout y enrutamiento por estado (sin React Router)
├── main.tsx                # Punto de entrada; monta AuthProvider
├── context/AuthContext.tsx # Auth, roles y persistencia en localStorage
├── data/                   # Datos mock (productos, pedidos, usuarios)
├── types/                  # Tipos e interfaces del dominio
├── components/             # Sidebar, Header, tarjetas, gráficos, tablas
└── pages/                  # Vistas: Inicio, Productos, Pedidos, Análisis,
                            #         Configuración, Usuarios, Login, Registro
```

## Limitaciones conocidas

- **Sin backend.** No hay API ni base de datos; los datos viven en memoria o en `localStorage`.
- **Seguridad solo cosmética.** La autenticación/autorización es del lado del cliente y puede eludirse desde DevTools. No usar con datos reales.
- **Contraseñas en texto plano** en `localStorage`. En un sistema real deben hashearse en el servidor.
- **Persistencia parcial.** Usuarios y sesión persisten; los productos y la configuración se reinician al recargar.
- **Sin pruebas automatizadas** todavía.

Para llevar esto a producción se requiere, como mínimo, un backend real de autenticación/autorización con hashing de contraseñas y validación de cada acción sensible en el servidor.
