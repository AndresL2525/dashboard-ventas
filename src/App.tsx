import "./App.css";
import { useState } from "react";
import type { SeccionId } from "./components/Sidebar";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";
import Analisis from "./pages/Analisis";
import Configuracion from "./pages/Configuracion";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import { productos as productosIniciales } from "./data/ventas";
import type { Producto } from "./types";
import { useAuth } from "./context/AuthContext";

type PantallaAuth = "login" | "registro";

function App() {
  const { usuario, tienePermiso } = useAuth();

  const [pantallaAuth, setPantallaAuth] = useState<PantallaAuth>("login");

  const [seccionActiva, setSeccionActiva] = useState<SeccionId>("inicio");
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);

  // Verifica permisos para una sección
  const puedeAcceder = (seccion: SeccionId): boolean => {
    if (!usuario) return false;
    
    const permisosSeccion: Record<SeccionId, boolean> = {
      inicio: true,
      productos: true,
      pedidos: true,
      analisis: tienePermiso(["administrador", "visualizador"]),
      configuracion: tienePermiso(["administrador"]),
      usuarios: tienePermiso(["administrador"]),
    };
    
    return permisosSeccion[seccion];
  };

  // Maneja la selección de sección (permiso check ANTES de cambiar estado)
  const manejarSeleccionSeccion = (seccion: SeccionId) => {
    if (puedeAcceder(seccion)) {
      setSeccionActiva(seccion);
    } else {
      setSeccionActiva("inicio");
    }
  };

  const agregarProducto = (nuevo: Omit<Producto, "id">) => {
    const nuevoId =
      productos.length > 0
        ? Math.max(...productos.map((p) => p.id)) + 1
        : 1;
    setProductos((prev) => [...prev, { ...nuevo, id: nuevoId }]);
  };

  const actualizarProducto = (productoEditado: Producto) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === productoEditado.id ? productoEditado : p))
    );
  };

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const restablecerProductos = () => {
    if (window.confirm("Esto borrará todos los cambios. ¿Continuar?")) {
      setProductos(productosIniciales);
    }
  };

  // Si NO hay usuario autenticado, mostrar Login o Registro
  if (!usuario) {
    if (pantallaAuth === "login") {
      return <Login onIrARegistro={() => setPantallaAuth("registro")} />;
    }
    return <Registro onIrALogin={() => setPantallaAuth("login")} />;
  }

  const renderizarSeccion = () => {
    // Guard defensivo: aunque la navegación por Sidebar ya filtra por
    // permisos, verificamos también aquí para que un estado inesperado
    // nunca renderice una sección restringida. (La autorización real
    // debe vivir en un backend; esto solo protege la UI.)
    if (!puedeAcceder(seccionActiva)) {
      return <Inicio productos={productos} />;
    }

    switch (seccionActiva) {
      case "inicio":
        return <Inicio productos={productos} />;
      case "productos":
        return (
          <Productos
            productos={productos}
            onAgregar={agregarProducto}
            onActualizar={actualizarProducto}
            onEliminar={eliminarProducto}
            onRestablecer={restablecerProductos}
          />
        );
      case "pedidos":
        return <Pedidos />;
      case "analisis":
        return <Analisis />;
      case "configuracion":
        return <Configuracion />;
      case "usuarios":
        return <Usuarios />;
      default:
        return <Inicio productos={productos} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        seccionActiva={seccionActiva}
        onSeleccionarSeccion={manejarSeleccionSeccion}
      />
      <div className="app-contenido">
        <Header notificaciones={3} />
        <main className="app-main">{renderizarSeccion()}</main>
      </div>
    </div>
  );
}

export default App;
