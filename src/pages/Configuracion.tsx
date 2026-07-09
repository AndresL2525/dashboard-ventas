import { useState } from "react";

interface ConfigField {
    key: string;
    label: string;
    value: string;
    icon: string;
    editable: boolean;
}

function Configuracion() {
    const [editando, setEditando] = useState(false);
    const [guardado, setGuardado] = useState(false);

    const [config, setConfig] = useState<ConfigField[]>([
        { key: "empresa",    label: "Empresa",       value: "Ventas SAS",           icon: "🏢", editable: true  },
        { key: "moneda",     label: "Moneda",         value: "COP - Pesos Colombianos", icon: "💰", editable: true  },
        { key: "zona",       label: "Zona Horaria",   value: "America/Bogota",       icon: "🕐", editable: true  },
        { key: "idioma",     label: "Idioma",         value: "Español",              icon: "🌐", editable: true  },
        { key: "version",    label: "Versión",        value: "v1.0.0",               icon: "🔖", editable: false },
    ]);

    const [temp, setTemp] = useState<ConfigField[]>(config);

    const handleEditar = () => {
        setTemp([...config]);
        setEditando(true);
        setGuardado(false);
    };

    const handleGuardar = () => {
        setConfig([...temp]);
        setEditando(false);
        setGuardado(true);
        setTimeout(() => setGuardado(false), 3000);
    };

    const handleCancelar = () => {
        setTemp([...config]);
        setEditando(false);
    };

    const handleChange = (key: string, value: string) => {
        setTemp(prev => prev.map(f => f.key === key ? { ...f, value } : f));
    };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", padding: "8px 0" }}>

            {/* Header */}
            <div style={{ marginBottom: "28px" }}>
                <h1 style={{ color: "#111827", fontSize: "24px", fontWeight: 800, margin: 0 }}>
                    Configuración
                </h1>
                <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "6px", marginBottom: 0 }}>
                    Ajustes generales del Dashboard
                </p>
            </div>

            {/* ✅ Toast de guardado */}
            {guardado && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#f0fdf4",
                    border: "1.5px solid #bbf7d0",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    marginBottom: "20px",
                    animation: "fadeIn 0.3s ease"
                }}>
                    <span style={{ fontSize: "16px" }}>✅</span>
                    <p style={{ color: "#16a34a", fontSize: "13px", fontWeight: 600, margin: 0 }}>
                        Configuración guardada correctamente
                    </p>
                </div>
            )}

            {/* Tarjeta principal */}
            <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                overflow: "hidden"
            }}>
                {/* Header tarjeta */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    borderBottom: "1px solid #f3f4f6"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                            width: 36, height: 36,
                            borderRadius: "10px",
                            background: "#eff6ff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "18px"
                        }}>
                            ⚙️
                        </div>
                        <div>
                            <p style={{ color: "#111827", fontSize: "15px", fontWeight: 700, margin: 0 }}>
                                Información general
                            </p>
                            <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
                                Datos principales del sistema
                            </p>
                        </div>
                    </div>

                    {/* Botones */}
                    {!editando ? (
                        <button
                            onClick={handleEditar}
                            style={{
                                display: "flex", alignItems: "center", gap: "6px",
                                padding: "8px 16px",
                                borderRadius: "10px",
                                border: "1.5px solid #e5e7eb",
                                background: "#f9fafb",
                                color: "#374151",
                                fontSize: "13px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            ✏️ Editar
                        </button>
                    ) : (
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                onClick={handleCancelar}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "10px",
                                    border: "1.5px solid #e5e7eb",
                                    background: "#f9fafb",
                                    color: "#6b7280",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGuardar}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "10px",
                                    border: "1.5px solid #bbf7d0",
                                    background: "#22c55e",
                                    color: "#ffffff",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    boxShadow: "0 2px 8px rgba(34,197,94,0.3)"
                                }}
                            >
                                💾 Guardar
                            </button>
                        </div>
                    )}
                </div>

                {/* Campos */}
                <div style={{ padding: "8px 0" }}>
                    {(editando ? temp : config).map((field, i) => (
                        <div
                            key={field.key}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "16px 24px",
                                borderBottom: i < config.length - 1 ? "1px solid #f9fafb" : "none",
                                gap: "16px",
                                flexWrap: "wrap"
                            }}
                        >
                            {/* Label */}
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 160 }}>
                                <div style={{
                                    width: 32, height: 32,
                                    borderRadius: "8px",
                                    background: "#f9fafb",
                                    border: "1px solid #f3f4f6",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "15px", flexShrink: 0
                                }}>
                                    {field.icon}
                                </div>
                                <span style={{ color: "#6b7280", fontSize: "13px", fontWeight: 500 }}>
                                    {field.label}
                                </span>
                            </div>

                            {/* Valor o input */}
                            {editando && field.editable ? (
                                <input
                                    value={field.value}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    style={{
                                        flex: 1,
                                        maxWidth: "320px",
                                        padding: "8px 12px",
                                        borderRadius: "10px",
                                        border: "1.5px solid #3b82f6",
                                        background: "#eff6ff",
                                        color: "#111827",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        outline: "none",
                                        boxShadow: "0 0 0 3px rgba(59,130,246,0.1)"
                                    }}
                                />
                            ) : (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{
                                        color: "#111827",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        background: "#f9fafb",
                                        border: "1px solid #f3f4f6",
                                        padding: "6px 12px",
                                        borderRadius: "8px"
                                    }}>
                                        {field.value}
                                    </span>
                                    {!field.editable && (
                                        <span style={{
                                            background: "#fef3c7",
                                            color: "#d97706",
                                            fontSize: "10px",
                                            fontWeight: 700,
                                            padding: "2px 8px",
                                            borderRadius: "20px",
                                            border: "1px solid #fde68a"
                                        }}>
                                            Solo lectura
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ✅ Tarjeta de peligro */}
            <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: "1.5px solid #fee2e2",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginTop: "20px",
                overflow: "hidden"
            }}>
                <div style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid #fee2e2",
                    display: "flex", alignItems: "center", gap: "10px"
                }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: "10px",
                        background: "#fef2f2",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "18px"
                    }}>
                        ⚠️
                    </div>
                    <div>
                        <p style={{ color: "#ef4444", fontSize: "15px", fontWeight: 700, margin: 0 }}>
                            Zona de peligro
                        </p>
                        <p style={{ color: "#fca5a5", fontSize: "12px", margin: 0 }}>
                            Acciones irreversibles del sistema
                        </p>
                    </div>
                </div>

                <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                        <p style={{ color: "#374151", fontSize: "13px", fontWeight: 600, margin: 0 }}>
                            Restablecer configuración
                        </p>
                        <p style={{ color: "#9ca3af", fontSize: "12px", margin: "2px 0 0 0" }}>
                            Vuelve todos los ajustes a los valores por defecto
                        </p>
                    </div>
                    <button style={{
                        padding: "8px 16px",
                        borderRadius: "10px",
                        border: "1.5px solid #fca5a5",
                        background: "#fef2f2",
                        color: "#ef4444",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer"
                    }}>
                        🔄 Restablecer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Configuracion;