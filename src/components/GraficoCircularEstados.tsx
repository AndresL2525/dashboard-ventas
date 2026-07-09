import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";
import type { Pedido } from "../types";
import { useState, useEffect, useRef } from "react";

interface GraficoCircularEstadosProps {
    pedidos: Pedido[];
}

interface DatoEstado {
    nombre: string;
    cantidad: number;
    total: number;
}

const COLORES_ESTADO: Record<string, { color: string; light: string; label: string; icon: string }> = {
    pendiente: { color: "#f97316", light: "#fff7ed", label: "Pendiente", icon: "⏳" },
    enviado:   { color: "#3b82f6", light: "#eff6ff", label: "Enviado",   icon: "🚚" },
    entregado: { color: "#22c55e", light: "#f0fdf4", label: "Entregado", icon: "✅" },
};

const COLOR_DEFAULT = { color: "#a855f7", light: "#faf5ff", label: "Otro", icon: "📦" };

// ✅ Tooltip personalizado blanco
const TooltipPersonalizado = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const item = payload[0];
        const nombre = item.name as string;
        const cfg = COLORES_ESTADO[nombre] ?? COLOR_DEFAULT;
        const pct = total > 0 ? ((item.value / item.payload.total) * 100).toFixed(1) : "0";
        return (
            <div style={{
                background: "#ffffff",
                border: `1.5px solid ${cfg.color}30`,
                borderRadius: "14px",
                padding: "14px 18px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                minWidth: "150px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "16px" }}>{cfg.icon}</span>
                    <span style={{ color: "#9ca3af", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                        {cfg.label}
                    </span>
                </div>
                <p style={{ color: cfg.color, fontSize: "26px", fontWeight: 800, margin: 0, lineHeight: 1 }}>
                    {item.value}
                </p>
                <p style={{ color: "#9ca3af", fontSize: "12px", margin: "4px 0 0 0" }}>
                    {pct}% del total
                </p>
            </div>
        );
    }
    return null;
};

// ✅ % dentro de cada segmento
const LabelPersonalizado = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.08) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="#ffffff" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// ✅ Texto central del donut
const CentroDonut = ({ cx, cy, total }: { cx: number; cy: number; total: number }) => (
    <>
        <text x={cx} y={cy - 10} textAnchor="middle" fill="#111827" fontSize={28} fontWeight={800}>
            {total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#9ca3af" fontSize={12} fontWeight={500}>
            pedidos
        </text>
    </>
);

let total = 0;

function GraficoCircularEstados(props: GraficoCircularEstadosProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [animado, setAnimado] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setAnimado(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const pedidos = props.pedidos ?? [];
    total = pedidos.length;

    const conteo: Record<string, number> = pedidos.reduce((acc, pedido) => {
        const estado = (pedido as any).estado ?? "otro";
        acc[estado] = (acc[estado] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const datos: DatoEstado[] = Object.keys(conteo).map((estado) => ({
        nombre: estado,
        cantidad: conteo[estado],
        total
    }));

    // ✅ Estado vacío
    if (total === 0) {
        return (
            <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "28px",
                marginTop: "24px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                fontFamily: "system-ui, sans-serif"
            }}>
                <h2 style={{ color: "#111827", fontSize: "18px", fontWeight: 700, margin: 0 }}>Pedidos por estado</h2>
                <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: "4px" }}>No hay pedidos registrados</p>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            style={{
                // ✅ Mismo estilo blanco que el gráfico de barras
                background: "#ffffff",
                borderRadius: "16px",
                padding: "28px 28px 24px 28px",
                marginTop: "24px",
                marginBottom: "8px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                fontFamily: "system-ui, sans-serif"
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                    <h2 style={{ color: "#111827", fontSize: "18px", fontWeight: 700, margin: 0 }}>
                        Pedidos por estado
                    </h2>
                    <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: "4px", marginBottom: 0 }}>
                        Distribución actual de órdenes
                    </p>
                </div>
                <span style={{
                    background: "#f0fdf4",
                    color: "#22c55e",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    border: "1px solid #bbf7d0",
                    alignSelf: "flex-start"
                }}>
                    {total} pedidos
                </span>
            </div>

            {/* Divisor */}
            <div style={{ height: "1px", background: "#f3f4f6", margin: "16px 0 20px 0" }} />

            {/* Contenido: Donut + Leyenda */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>

                {/* ✅ Donut chart */}
                <div style={{ flex: "1 1 200px", height: 240, minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={datos}
                                dataKey="cantidad"
                                nameKey="nombre"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={3}
                                labelLine={false}
                                label={LabelPersonalizado}
                                isAnimationActive={animado}
                                animationDuration={900}
                                animationEasing="ease-out"
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {datos.map((entrada, index) => {
                                    const cfg = COLORES_ESTADO[entrada.nombre] ?? COLOR_DEFAULT;
                                    const isActive = activeIndex === index;
                                    return (
                                        <Cell
                                            key={entrada.nombre}
                                            fill={cfg.color}
                                            opacity={activeIndex === null || isActive ? 1 : 0.35}
                                            stroke={isActive ? cfg.color : "#ffffff"}
                                            strokeWidth={isActive ? 0 : 2}
                                            style={{ cursor: "pointer", filter: isActive ? `drop-shadow(0 4px 12px ${cfg.color}60)` : "none", transition: "all 0.2s" }}
                                        />
                                    );
                                })}
                            </Pie>

                            {/* Texto central */}
                            <text x="50%" y="46%" textAnchor="middle" fill="#111827" fontSize={28} fontWeight={800} dominantBaseline="middle">
                                {total}
                            </text>
                            <text x="50%" y="58%" textAnchor="middle" fill="#9ca3af" fontSize={12} fontWeight={500} dominantBaseline="middle">
                                pedidos
                            </text>

                            <Tooltip content={<TooltipPersonalizado />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* ✅ Leyenda vertical con tarjetas */}
                <div style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {datos.map((d, i) => {
                        const cfg = COLORES_ESTADO[d.nombre] ?? COLOR_DEFAULT;
                        const porcentaje = total > 0 ? ((d.cantidad / total) * 100).toFixed(1) : "0";
                        const isActive = activeIndex === i;
                        return (
                            <div
                                key={d.nombre}
                                onMouseEnter={() => setActiveIndex(i)}
                                onMouseLeave={() => setActiveIndex(null)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "12px 14px",
                                    borderRadius: "12px",
                                    background: isActive ? cfg.light : "#f9fafb",
                                    border: `1.5px solid ${isActive ? cfg.color + "40" : "#f3f4f6"}`,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {/* Indicador de color */}
                                    <div style={{
                                        width: 36, height: 36,
                                        borderRadius: "10px",
                                        background: cfg.light,
                                        border: `1.5px solid ${cfg.color}30`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "16px",
                                        flexShrink: 0
                                    }}>
                                        {cfg.icon}
                                    </div>
                                    <div>
                                        <p style={{ color: "#111827", fontSize: "13px", fontWeight: 600, margin: 0 }}>
                                            {cfg.label}
                                        </p>
                                        <p style={{ color: "#9ca3af", fontSize: "11px", margin: "2px 0 0 0" }}>
                                            {d.cantidad} pedido{d.cantidad !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>

                                {/* Porcentaje + barra */}
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ color: cfg.color, fontSize: "15px", fontWeight: 800, margin: 0 }}>
                                        {porcentaje}%
                                    </p>
                                    <div style={{ width: 48, height: 4, borderRadius: 4, background: "#f3f4f6", marginTop: 4 }}>
                                        <div style={{
                                            width: `${porcentaje}%`,
                                            height: "100%",
                                            borderRadius: 4,
                                            background: cfg.color,
                                            transition: "width 0.6s ease"
                                        }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ✅ Footer */}
            <div style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
            }}>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {datos.map((d, i) => {
                        const cfg = COLORES_ESTADO[d.nombre] ?? COLOR_DEFAULT;
                        return (
                            <div key={d.nombre} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color }} />
                                <span style={{ color: "#6b7280", fontSize: "12px" }}>{cfg.label}</span>
                                <span style={{ color: cfg.color, fontSize: "12px", fontWeight: 700 }}>{d.cantidad}</span>
                            </div>
                        );
                    })}
                </div>
                <p style={{ color: "#d1d5db", fontSize: "11px", margin: 0 }}>
                    Datos en tiempo real
                </p>
            </div>
        </div>
    );
}

export default GraficoCircularEstados;