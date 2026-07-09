import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer, Cell, LabelList
} from "recharts";
import type { Producto } from "../types";
import { useState, useEffect, useRef } from "react";

interface GraficoBarrasCategoriaProps {
    productos: Producto[];
}

interface DatoGrafico {
    categoria: string;
    totalVentas: number;
}

// ✅ Colores consistentes con tu dashboard (verde, naranja, azul claro)
const COLORES = ["#22c55e", "#f97316", "#3b82f6", "#a855f7", "#ec4899", "#eab308"];

const TooltipPersonalizado = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const valor = payload[0].value as number;
        return (
            <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
                <p style={{ color: '#9ca3af', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>
                    {label}
                </p>
                <p style={{ color: '#111827', fontSize: '16px', fontWeight: 700, margin: 0 }}>
                    ${valor.toLocaleString('es-CO')}
                </p>
            </div>
        );
    }
    return null;
};

const LabelPersonalizado = (props: any) => {
    const { x, y, width, value } = props;
    if (!value) return null;
    const texto = value >= 1000000
        ? `$${(value / 1000000).toFixed(1)}M`
        : `$${(value / 1000).toFixed(0)}K`;
    return (
        <text x={x + width / 2} y={y - 8} fill="#6b7280" textAnchor="middle" fontSize={11} fontWeight={600}>
            {texto}
        </text>
    );
};

function GraficoBarrasCategoria(props: GraficoBarrasCategoriaProps) {
    const [categoriaActiva, setCategoriaActiva] = useState<string>("Todas");
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

    const p = (props.productos ?? []) as any[];

    const agrupado: Record<string, number> = p.reduce((acc, producto) => {
        const cat = producto.categoria ?? producto.Categoria ?? "Sin categoría";
        const unidades = Number(producto.unidadesVendidas ?? producto.cantidad ?? 0);
        const precio = Number(producto.precioUnitario ?? producto.precio ?? 0);
        acc[cat] = (acc[cat] || 0) + unidades * precio;
        return acc;
    }, {} as Record<string, number>);

    const todasCategorias = Object.keys(agrupado);

    const datosFiltrados: DatoGrafico[] = todasCategorias
        .filter(cat => categoriaActiva === "Todas" || cat === categoriaActiva)
        .map(cat => ({ categoria: cat, totalVentas: agrupado[cat] }))
        .sort((a, b) => b.totalVentas - a.totalVentas);

    const totalGeneral = datosFiltrados.reduce((s, d) => s + d.totalVentas, 0);

    if (p.length === 0 || todasCategorias.length === 0) {
        return (
            <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '28px',
                marginTop: '24px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'
            }}>
                <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: 700, margin: 0 }}>Ventas por categoría</h2>
                <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>No hay datos disponibles</p>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            style={{
                // ✅ Fondo blanco igual que tarjetas KPI
                background: '#ffffff',
                borderRadius: '16px',
                padding: '28px 28px 24px 28px',
                marginTop: '24px',
                marginBottom: '8px',
                border: '1px solid #f1f5f9',
                // ✅ Sombra suave igual que tarjetas KPI
                boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
                fontFamily: 'system-ui, sans-serif'
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: 700, margin: 0 }}>
                        Ventas por categoría
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px', marginBottom: 0 }}>
                        Resumen analítico del total de ingresos acumulados
                    </p>
                </div>

                {/* Total destacado */}
                <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#9ca3af', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px 0' }}>
                        Total acumulado
                    </p>
                    <p style={{ color: '#22c55e', fontSize: '20px', fontWeight: 800, margin: 0 }}>
                        ${totalGeneral.toLocaleString('es-CO')}
                    </p>
                </div>
            </div>

            {/* Divisor */}
            <div style={{ height: '1px', background: '#f3f4f6', marginBottom: '20px' }} />

            {/* ✅ Filtros estilo pill */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {["Todas", ...todasCategorias].map((cat, i) => {
                    const activo = categoriaActiva === cat;
                    const color = cat === "Todas" ? "#3b82f6" : COLORES[(i - 1) % COLORES.length];
                    return (
                        <button
                            key={cat}
                            onClick={() => setCategoriaActiva(cat)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '20px',
                                border: activo ? `1.5px solid ${color}` : '1.5px solid #e5e7eb',
                                background: activo ? `${color}12` : '#f9fafb',
                                color: activo ? color : '#6b7280',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Gráfico */}
            <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={datosFiltrados}
                        margin={{ top: 28, right: 16, left: 10, bottom: 8 }}
                    >
                        <defs>
                            {COLORES.map((color, i) => (
                                <linearGradient key={i} id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0.25} />
                                </linearGradient>
                            ))}
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />

                        <XAxis
                            dataKey="categoria"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#d1d5db', fontSize: 11 }}
                            tickFormatter={(val) =>
                                val >= 1000000
                                    ? `$${(val / 1000000).toFixed(1)}M`
                                    : `$${(val / 1000).toFixed(0)}K`
                            }
                            dx={-5}
                        />

                        <Tooltip content={<TooltipPersonalizado />} cursor={{ fill: 'rgba(243,244,246,0.8)' }} />

                        <Bar
                            dataKey="totalVentas"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={60}
                            isAnimationActive={animado}
                            animationDuration={900}
                            animationEasing="ease-out"
                        >
                            <LabelList content={<LabelPersonalizado />} />
                            {datosFiltrados.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`url(#grad${index % COLORES.length})`}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ✅ Leyenda con porcentajes */}
            <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #f3f4f6'
            }}>
                {datosFiltrados.map((d, i) => {
                    const porcentaje = totalGeneral > 0
                        ? ((d.totalVentas / totalGeneral) * 100).toFixed(1)
                        : '0';
                    const color = COLORES[i % COLORES.length];
                    return (
                        <div key={d.categoria} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: 10, height: 10,
                                borderRadius: '50%',
                                background: color,
                                flexShrink: 0
                            }} />
                            <span style={{ color: '#6b7280', fontSize: '12px' }}>{d.categoria}</span>
                            <span style={{ color, fontSize: '12px', fontWeight: 700 }}>{porcentaje}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GraficoBarrasCategoria;