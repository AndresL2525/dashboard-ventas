import './TarjetaKPI.css';

interface TarjetaKPIProps {
    titulo: string;
    valor: string;
    color?: string;
    tendencia?: {
        valor: string;
        positivo: boolean;
    };
}

function TarjetaKPI({ titulo, valor, color = '#2e75b6', tendencia }: TarjetaKPIProps) {
    return (
        <div 
            className="tarjeta-kpi" 
            style={{ '--color-kpi': color } as React.CSSProperties}
        >
            {/* Glow de fondo difuminado basado en el color del KPI */}
            <div className="kpi-glow" />
            
            <div className="kpi-header">
                <span className="kpi-titulo">{titulo}</span>
                {tendencia && (
                    <span className={`kpi-tendencia ${tendencia.positivo ? 'is-positive' : 'is-negative'}`}>
                        {tendencia.positivo ? '↑' : '↓'} {tendencia.valor}
                    </span>
                )}
            </div>
            
            <h3 className="kpi-valor">{valor}</h3>
        </div>
    );
}

export default TarjetaKPI;