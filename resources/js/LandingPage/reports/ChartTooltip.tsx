import { useRef, useState, useCallback } from 'react';

export interface ChartPoint {
    label: string;
    x: number; // 0–1000 in SVG viewBox coords
    y: number; // 0–1 normalised (0=top)
    values: { name: string; value: string; color: string }[];
}

interface TooltipState {
    visible: boolean;
    x: number;      // px from left of SVG container
    svgX: number;   // SVG coord x
    points: ChartPoint['values'];
    label: string;
}

export function useChartTooltip(points: ChartPoint[]) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, svgX: 0, points: [], label: '' });

    const onMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const svgX = (relX / rect.width) * 1000;

        // Find closest point
        let closest = points[0];
        let minDist = Math.abs(points[0].x - svgX);
        for (const p of points) {
            const d = Math.abs(p.x - svgX);
            if (d < minDist) { minDist = d; closest = p; }
        }

        setTooltip({ visible: true, x: relX, svgX: closest.x, points: closest.values, label: closest.label });
    }, [points]);

    const onMouseLeave = useCallback(() => {
        setTooltip(t => ({ ...t, visible: false }));
    }, []);

    return { svgRef, tooltip, onMouseMove, onMouseLeave };
}

interface ChartTooltipProps {
    tooltip: TooltipState;
    containerWidth: number;
}

export function ChartTooltip({ tooltip, containerWidth }: ChartTooltipProps) {
    if (!tooltip.visible) return null;

    const tooltipWidth = 160;
    let left = tooltip.x + 12;
    if (left + tooltipWidth > containerWidth) left = tooltip.x - tooltipWidth - 12;

    return (
        <div style={{
            position: 'absolute',
            top: 8,
            left,
            width: tooltipWidth,
            background: '#ffffff',
            border: '1px solid rgba(17,24,39,0.12)',
            borderRadius: 8,
            padding: '8px 12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            pointerEvents: 'none',
            zIndex: 10,
            fontFamily: 'inherit',
        }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {tooltip.label}
            </div>
            {tooltip.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0, display: 'inline-block' }} />
                        <span style={{ fontSize: 11, color: '#6b7280' }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>{p.value}</span>
                </div>
            ))}
        </div>
    );
}

/** Vertical crosshair line at the hovered SVG x position */
export function CrosshairLine({ svgX, visible }: { svgX: number; visible: boolean }) {
    if (!visible) return null;
    return (
        <line
            x1={svgX} y1={0} x2={svgX} y2={1000}
            stroke="rgba(17,24,39,0.15)"
            strokeWidth={1}
            strokeDasharray="4,3"
        />
    );
}
