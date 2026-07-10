import { useState } from "react";
import "./Configuracion.css";

interface ConfigField {
    key: string;
    label: string;
    value: string;
    icon: string;
    editable: boolean;
}

const configPorDefecto: ConfigField[] = [
    { key: "empresa",    label: "Empresa",       value: "Ventas SAS",           icon: "🏢", editable: true  },
    { key: "moneda",     label: "Moneda",         value: "COP - Pesos Colombianos", icon: "💰", editable: true  },
    { key: "zona",       label: "Zona Horaria",   value: "America/Bogota",       icon: "🕐", editable: true  },
    { key: "idioma",     label: "Idioma",         value: "Español",              icon: "🌐", editable: true  },
    { key: "version",    label: "Versión",        value: "v1.0.0",               icon: "🔖", editable: false },
];

function Configuracion() {
    const [editando, setEditando] = useState(false);
    const [guardado, setGuardado] = useState(false);

    const [config, setConfig] = useState<ConfigField[]>(configPorDefecto);

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

    const handleRestablecer = () => {
        const confirmado = window.confirm(
            "Esto devolverá toda la configuración a los valores por defecto. ¿Continuar?"
        );
        if (!confirmado) return;
        setConfig(configPorDefecto);
        setTemp(configPorDefecto);
        setEditando(false);
        setGuardado(true);
        setTimeout(() => setGuardado(false), 3000);
    };

    return (
        <div className="config">

            {/* Header */}
            <div className="config-header">
                <h1>Configuración</h1>
                <p>Ajustes generales del Dashboard</p>
            </div>

            {/* Toast de guardado */}
            {guardado && (
                <div className="config-toast">
                    <span>✅</span>
                    <p>Configuración guardada correctamente</p>
                </div>
            )}

            {/* Tarjeta principal */}
            <div className="config-tarjeta">
                {/* Header tarjeta */}
                <div className="config-tarjeta-header">
                    <div className="config-tarjeta-titulo">
                        <div className="config-icono-caja">⚙️</div>
                        <div>
                            <strong>Información general</strong>
                            <small>Datos principales del sistema</small>
                        </div>
                    </div>

                    {/* Botones */}
                    {!editando ? (
                        <button className="config-btn config-btn-secundario" onClick={handleEditar}>
                            ✏️ Editar
                        </button>
                    ) : (
                        <div className="config-acciones">
                            <button className="config-btn config-btn-cancelar" onClick={handleCancelar}>
                                Cancelar
                            </button>
                            <button className="config-btn config-btn-guardar" onClick={handleGuardar}>
                                💾 Guardar
                            </button>
                        </div>
                    )}
                </div>

                {/* Campos */}
                <div className="config-campos">
                    {(editando ? temp : config).map((field) => (
                        <div key={field.key} className="config-campo">
                            {/* Label */}
                            <div className="config-campo-label">
                                <div className="config-campo-icono">{field.icon}</div>
                                <span>{field.label}</span>
                            </div>

                            {/* Valor o input */}
                            {editando && field.editable ? (
                                <input
                                    className="config-input"
                                    value={field.value}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                />
                            ) : (
                                <div className="config-valor-caja">
                                    <span className="config-valor">{field.value}</span>
                                    {!field.editable && (
                                        <span className="config-badge-lectura">Solo lectura</span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tarjeta de peligro */}
            <div className="config-peligro">
                <div className="config-peligro-header">
                    <div className="config-peligro-icono">⚠️</div>
                    <div>
                        <strong>Zona de peligro</strong>
                        <small>Acciones irreversibles del sistema</small>
                    </div>
                </div>

                <div className="config-peligro-body">
                    <div>
                        <strong>Restablecer configuración</strong>
                        <small>Vuelve todos los ajustes a los valores por defecto</small>
                    </div>
                    <button className="config-btn-peligro" onClick={handleRestablecer}>
                        🔄 Restablecer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Configuracion;