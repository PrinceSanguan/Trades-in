import { useState } from "react";
import { useChartTooltip, ChartTooltip, CrosshairLine } from "./ChartTooltip";
import type { ChartPoint } from "./ChartTooltip";

const CHART_POINTS: ChartPoint[] = [
    { label: "Jan 29", x: 0,   y: 0, values: [{ name: "Clicks", value: "52",  color: "#ff6900" }, { name: "Impr.",     value: "1.1K",  color: "#374151" }, { name: "Cost/Conv.", value: "£145", color: "#c45a00" }] },
    { label: "Feb 2",  x: 66,  y: 0, values: [{ name: "Clicks", value: "71",  color: "#ff6900" }, { name: "Impr.",     value: "2.1K",  color: "#374151" }, { name: "Cost/Conv.", value: "£121", color: "#c45a00" }] },
    { label: "Feb 9",  x: 132, y: 0, values: [{ name: "Clicks", value: "118", color: "#ff6900" }, { name: "Impr.",     value: "3.4K",  color: "#374151" }, { name: "Conv.",      value: "8",    color: "#9ca3af" }] },
    { label: "Feb 16", x: 198, y: 0, values: [{ name: "Clicks", value: "95",  color: "#ff6900" }, { name: "Impr.",     value: "2.8K",  color: "#374151" }, { name: "Conv.",      value: "6",    color: "#9ca3af" }] },
    { label: "Feb 23", x: 270, y: 0, values: [{ name: "Clicks", value: "142", color: "#ff6900" }, { name: "Impr.",     value: "4.0K",  color: "#374151" }, { name: "Conv.",      value: "9",    color: "#9ca3af" }] },
    { label: "Mar 2",  x: 370, y: 0, values: [{ name: "Clicks", value: "108", color: "#ff6900" }, { name: "Impr.",     value: "3.1K",  color: "#374151" }, { name: "Cost/Conv.", value: "£110", color: "#c45a00" }] },
    { label: "Mar 7",  x: 440, y: 0, values: [{ name: "Clicks", value: "165", color: "#ff6900" }, { name: "Impr.",     value: "4.5K",  color: "#374151" }, { name: "Conv.",      value: "11",   color: "#9ca3af" }] },
    { label: "Mar 12", x: 530, y: 0, values: [{ name: "Clicks", value: "79",  color: "#ff6900" }, { name: "Impr.",     value: "2.4K",  color: "#374151" }, { name: "Cost/Conv.", value: "£135", color: "#c45a00" }] },
    { label: "Mar 17", x: 640, y: 0, values: [{ name: "Clicks", value: "72",  color: "#ff6900" }, { name: "Impr.",     value: "2.1K",  color: "#374151" }, { name: "Cost/Conv.", value: "£142", color: "#c45a00" }] },
    { label: "Mar 22", x: 750, y: 0, values: [{ name: "Clicks", value: "60",  color: "#ff6900" }, { name: "Impr.",     value: "1.8K",  color: "#374151" }, { name: "Conv.",      value: "4",    color: "#9ca3af" }] },
    { label: "Mar 27", x: 1000,y: 0, values: [{ name: "Clicks", value: "48",  color: "#ff6900" }, { name: "Impr.",     value: "1.4K",  color: "#374151" }, { name: "Cost/Conv.", value: "£155", color: "#c45a00" }] },
];

interface OppCardProps { name: string; initials: string; value?: string; faded?: boolean; }
function OppCard({ name, initials, value = "£0.00", faded }: OppCardProps) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="opp-card"
            style={{ opacity: faded ? 0.4 : 1, borderStyle: faded ? "dashed" : undefined, background: hovered && !faded ? "#fff" : undefined, borderColor: hovered && !faded ? "rgba(17,24,39,0.2)" : undefined, cursor: "default" }}
            onMouseEnter={() => !faded && setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="opp-row">
                <div className="opp-name">{name}</div>
                <div className="opp-avatar">{initials}</div>
            </div>
            <div className="opp-value">Opportunity Value: {value}</div>
        </div>
    );
}

export default function GoogleAdsCrmReport() {
    const { svgRef, tooltip, onMouseMove, onMouseLeave } = useChartTooltip(CHART_POINTS);
    const [activeStat, setActiveStat] = useState<number | null>(null);

    const stats = [
        { cls: "stat-item",        dot: "#ff6900", label: "Clicks",        value: "1.55K", sub: "Total clicks · 2 months" },
        { cls: "stat-item",        dot: "#c45a00", label: "Impressions",   value: "38.5K", sub: "Ad impressions"           },
        { cls: "stat-item",        dot: "#374151", label: "Cost / Conv.",  value: "£123",  sub: "Per conversion"           },
        { cls: "stat-item",        dot: "#6b7280", label: "Conversions",   value: "67",    sub: "Lead form submits"        },
    ];

    return (
        <div className="rptGac" style={{ position: "relative", overflow: "hidden" }}>
            <div className="wrapper">
                <header>
                    <div className="tag">● Live Campaign Data</div>
                    <h1>Google Ads<br /><span>&amp;</span> CRM Pipeline</h1>
                    <p className="subtitle">Performance snapshot from Jan 29 – Mar 27, 2026 · Paid Search + GoHighLevel opportunity tracking</p>
                </header>

                <div className="stats-row">
                    {stats.map((s, i) => (
                        <div key={i} className={s.cls}
                            style={{ background: activeStat === i ? "var(--surface)" : undefined, transition: "background 0.18s", cursor: "default" }}
                            onMouseEnter={() => setActiveStat(i)} onMouseLeave={() => setActiveStat(null)}>
                            <div className="stat-label">
                                <span className="stat-dot" style={{ background: s.dot, borderRadius: "50%", width: 8, height: 8, display: "inline-block" }} />
                                {s.label}
                            </div>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-sub">{s.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="section-label"><h2>Campaign Performance</h2></div>

                <div className="chart-card">
                    <div className="chart-header">
                        <div>
                            <div className="chart-title">Clicks · Impressions · Cost/Conv. · Conversions</div>
                            <div className="chart-meta">Jan 29, 2026 → Mar 27, 2026</div>
                        </div>
                        <div className="legend">
                            <div className="legend-item"><div className="legend-line" style={{ background: "#ff6900" }} />Clicks</div>
                            <div className="legend-item"><div className="legend-line" style={{ background: "#374151" }} />Impressions</div>
                            <div className="legend-item"><div className="legend-line" style={{ background: "#c45a00" }} />Cost/Conv.</div>
                            <div className="legend-item"><div className="legend-line" style={{ borderTop: "2px dashed #9ca3af", background: "none", width: 20 }} />Conv.</div>
                        </div>
                    </div>
                    <div className="chart-body" style={{ position: "relative" }}>
                        <svg ref={svgRef} className="chart-svg" viewBox="0 0 1000 200" preserveAspectRatio="none"
                            style={{ cursor: "crosshair", display: "block", overflow: "visible" }}
                            onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                            <defs>
                                <linearGradient id="gac-fill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ff6900" stopOpacity="0.12" />
                                    <stop offset="100%" stopColor="#ff6900" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <line x1="0" y1="50"  x2="1000" y2="50"  stroke="rgba(17,24,39,0.06)" strokeWidth="1" />
                            <line x1="0" y1="100" x2="1000" y2="100" stroke="rgba(17,24,39,0.06)" strokeWidth="1" />
                            <line x1="0" y1="150" x2="1000" y2="150" stroke="rgba(17,24,39,0.06)" strokeWidth="1" />
                            <polygon fill="url(#gac-fill)" points="0,160 66,130 132,80 198,110 270,55 370,90 440,30 530,100 640,130 750,138 1000,155 1000,200 0,200" />
                            <polyline fill="none" stroke="#ff6900" strokeWidth="2.5" strokeLinejoin="round" points="0,160 66,130 132,80 198,110 270,55 370,90 440,30 530,100 640,130 750,138 1000,155" />
                            <polyline fill="none" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round" points="0,155 66,120 132,60 198,100 270,50 370,85 440,40 530,95 640,120 750,133 1000,150" />
                            <polyline fill="none" stroke="#c45a00" strokeWidth="1.5" strokeLinejoin="round" points="0,145 66,155 132,140 198,160 270,120 370,155 440,170 530,50 640,160 750,125 1000,142" />
                            <polyline fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" strokeLinejoin="round" points="0,170 132,165 270,152 440,145 640,158 1000,160" />
                            <circle cx="440" cy="30" r="5" fill="#ff6900" stroke="white" strokeWidth="2" />
                            <CrosshairLine svgX={tooltip.svgX} visible={tooltip.visible} />
                            <text x="0"    y="195" fill="#9ca3af" fontSize="10" fontFamily="monospace">Jan 29</text>
                            <text x="500"  y="195" fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="middle">Feb 27</text>
                            <text x="1000" y="195" fill="#9ca3af" fontSize="10" fontFamily="monospace" textAnchor="end">Mar 27</text>
                        </svg>
                        <ChartTooltip tooltip={tooltip} containerWidth={900} />
                    </div>
                </div>

                <div className="section-label"><h2>GHL Opportunity Pipeline</h2></div>

                <div className="pipeline-grid">
                    <div className="pipeline-col">
                        <div className="pipeline-col-header" style={{ borderTop: "3px solid #374151" }}>
                            <span className="pipeline-col-title">Job Fully Booked</span>
                            <span className="pipeline-col-count">3 opps</span>
                        </div>
                        <div className="pipeline-cards">
                            <OppCard name="Jack Grover"  initials="HB" />
                            <OppCard name="Dan Ashton"   initials="HB" />
                            <OppCard name="Serena He"    initials="LB" />
                        </div>
                    </div>
                    <div className="pipeline-col">
                        <div className="pipeline-col-header" style={{ borderTop: "3px solid #ff6900" }}>
                            <span className="pipeline-col-title">To Book / Awaiting Finance</span>
                            <span className="pipeline-col-count">1 opp</span>
                        </div>
                        <div className="pipeline-cards">
                            <OppCard name="Jon Haile" initials="JH" />
                        </div>
                    </div>
                    <div className="pipeline-col">
                        <div className="pipeline-col-header" style={{ borderTop: "3px solid #c45a00" }}>
                            <span className="pipeline-col-title">Awaiting Paperwork</span>
                            <span className="pipeline-col-count">9 opps</span>
                        </div>
                        <div className="pipeline-cards">
                            <OppCard name="Ryan Davies"        initials="HB" />
                            <OppCard name="Salman"             initials="HB" />
                            <OppCard name="David Harris"       initials="HB" />
                            <OppCard name="Charlotte Bamford"  initials="HB" />
                            <OppCard name="Carl Banning Lead"  initials="CB" />
                            <OppCard name="Richard Crooke"     initials="HB" />
                            <OppCard name="+ 3 more" initials="" value="Scroll to view all" faded />
                        </div>
                    </div>
                </div>

                <footer>
                    <div className="footer-brand">Campaign Portfolio</div>
                    <div className="footer-note">Google Ads · GoHighLevel CRM · Jan–Mar 2026</div>
                </footer>
            </div>
        </div>
    );
}
