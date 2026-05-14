import { useState } from "react";
import { useChartTooltip, ChartTooltip, CrosshairLine } from "./ChartTooltip";
import type { ChartPoint } from "./ChartTooltip";

const CHART_POINTS: ChartPoint[] = [
    { label: "Feb 25", x: 0,    y: 0, values: [{ name: "Clicks", value: "3",  color: "#ff6900" }, { name: "Impr.", value: "210", color: "#374151" }, { name: "Conv.", value: "0", color: "#9ca3af" }] },
    { label: "Mar 1",  x: 120,  y: 0, values: [{ name: "Clicks", value: "8",  color: "#ff6900" }, { name: "Impr.", value: "380", color: "#374151" }, { name: "Conv.", value: "1", color: "#9ca3af" }] },
    { label: "Mar 5",  x: 240,  y: 0, values: [{ name: "Clicks", value: "12", color: "#ff6900" }, { name: "Impr.", value: "520", color: "#374151" }, { name: "Conv.", value: "1", color: "#9ca3af" }] },
    { label: "Mar 8",  x: 360,  y: 0, values: [{ name: "Clicks", value: "14", color: "#ff6900" }, { name: "Impr.", value: "610", color: "#374151" }, { name: "Conv.", value: "2", color: "#9ca3af" }] },
    { label: "Mar 12", x: 460,  y: 0, values: [{ name: "Clicks", value: "18", color: "#ff6900" }, { name: "Impr.", value: "720", color: "#374151" }, { name: "Conv.", value: "2", color: "#9ca3af" }] },
    { label: "Mar 15", x: 540,  y: 0, values: [{ name: "Clicks", value: "20", color: "#ff6900" }, { name: "Impr.", value: "780", color: "#374151" }, { name: "Conv.", value: "2", color: "#9ca3af" }, { name: "CPL", value: "£18.63", color: "#c45a00" }] },
    { label: "Mar 18", x: 620,  y: 0, values: [{ name: "Clicks", value: "15", color: "#ff6900" }, { name: "Impr.", value: "650", color: "#374151" }, { name: "Conv.", value: "2", color: "#9ca3af" }] },
    { label: "Mar 22", x: 760,  y: 0, values: [{ name: "Clicks", value: "11", color: "#ff6900" }, { name: "Impr.", value: "490", color: "#374151" }, { name: "Conv.", value: "1", color: "#9ca3af" }] },
    { label: "Mar 26", x: 1000, y: 0, values: [{ name: "Clicks", value: "7",  color: "#ff6900" }, { name: "Impr.", value: "300", color: "#374151" }, { name: "Conv.", value: "1", color: "#9ca3af" }] },
];

const PIPELINE = [
    { name: "Kimberly Kimberly",       src: "Organic",  value: "£1,950", initials: "KK" },
    { name: "Daniel Anderson",          src: "Organic",  value: "£3,109", initials: "DA" },
    { name: "New Boiler & Relocation",  src: "Referral", value: "£3,607", initials: "NB" },
];

function OppCard({ name, src, value, initials }: { name: string; src: string; value: string; initials: string }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="opp-card"
            style={{ borderColor: hovered ? "rgba(17,24,39,0.22)" : undefined, background: hovered ? "#fff" : undefined, cursor: "default" }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="opp-info">
                <div className="opp-name">{name}</div>
                <div className={"opp-src " + (src === "Organic" ? "src-organic" : "src-referral")}>● {src}</div>
            </div>
            <div className="opp-right">
                <div className="opp-av">{initials}</div>
                <div className="opp-value">{value}</div>
            </div>
        </div>
    );
}

export default function AuldHeatingReport() {
    const { svgRef, tooltip, onMouseMove, onMouseLeave } = useChartTooltip(CHART_POINTS);
    const [activeKpi, setActiveKpi] = useState<number | null>(null);

    const kpis = [
        { label: "Clicks",       value: "299",    note: "Search clicks",     accent: true  },
        { label: "Impressions",  value: "7.66K",  note: "Ad impressions",    accent: false },
        { label: "Cost / Conv.", value: "£39.07", note: "Per conversion",    accent: false },
        { label: "Conversions",  value: "28",     note: "Lead form submits", accent: false },
        { label: "Pipeline",     value: "£8.6K",  note: "CRM opp. value",   accent: true  },
    ];

    return (
        <div className="rptAuld" style={{ position: "relative", overflow: "hidden" }}>
            <div className="wrap">
                <div className="hero">
                    <div className="hero-text">
                        <div className="hero-eyebrow">
                            <span className="badge">Local Service</span>
                            <span className="badge b-alt">Google Ads</span>
                            <span className="badge b-alt">GHL CRM</span>
                        </div>
                        <h1>Auld Heating<br /><span>&amp; Plumbing</span></h1>
                        <div className="hero-sub">Boiler Installation &amp; Servicing · Google Search Campaigns · Llanelli Area</div>
                    </div>
                    <div className="hero-right">
                        <div className="period-lbl">Reporting Period</div>
                        <div className="period-val">Feb 25 –<br />Mar 26, 2026</div>
                    </div>
                </div>

                <div className="kpi-row">
                    {kpis.map((k, i) => (
                        <div key={i} className="kpi"
                            style={{ borderTop: `3px solid ${k.accent ? "var(--accent)" : "var(--dark)"}`, background: activeKpi === i ? "var(--surface)" : "var(--card)", transition: "background 0.18s", cursor: "default" }}
                            onMouseEnter={() => setActiveKpi(i)} onMouseLeave={() => setActiveKpi(null)}>
                            <div className="kpi-lbl">{k.label}</div>
                            <div className="kpi-val" style={{ color: k.accent ? "var(--accent-dark)" : "var(--text)" }}>{k.value}</div>
                            <div className="kpi-note">{k.note}</div>
                        </div>
                    ))}
                </div>

                <div className="sec-hd">
                    <h2>Google Ads Performance</h2>
                    <div className="sec-line" />
                    <span className="badge">Feb 25 – Mar 26</span>
                </div>

                <div className="chart-card">
                    <div className="chart-hdr">
                        <div>
                            <div className="chart-title">Clicks · Impressions · Conversions</div>
                            <div className="chart-period">Feb 25 → Mar 26, 2026 · Peak: Sun Mar 15 (20 clicks, 2 conv. @ £18.63)</div>
                        </div>
                        <div className="legend">
                            <div className="leg-item"><div className="leg-line" style={{ background: "#ff6900" }} />Clicks</div>
                            <div className="leg-item"><div className="leg-line" style={{ background: "#374151" }} />Impressions</div>
                            <div className="leg-item"><div className="leg-line" style={{ background: "none", borderTop: "2px dashed #9ca3af", width: 20 }} />Conv.</div>
                        </div>
                    </div>
                    <div className="chart-body" style={{ position: "relative" }}>
                        <svg ref={svgRef} className="chart-svg" viewBox="0 0 1000 185" preserveAspectRatio="none"
                            style={{ cursor: "crosshair", display: "block", overflow: "visible" }}
                            onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                            <defs>
                                <linearGradient id="auld-fill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ff6900" stopOpacity="0.12" />
                                    <stop offset="100%" stopColor="#ff6900" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {[46, 92, 138].map(y => <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(17,24,39,0.06)" strokeWidth="1" />)}
                            <polygon fill="url(#auld-fill)" points="0,175 120,160 240,145 360,130 460,110 540,90 620,100 760,108 1000,115 1000,185 0,185" />
                            <polyline fill="none" stroke="#ff6900" strokeWidth="2.5" strokeLinejoin="round" points="0,175 120,160 240,145 360,130 460,110 540,90 620,100 760,108 1000,115" />
                            <polyline fill="none" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round" points="0,172 120,155 240,140 360,122 460,105 540,82 620,96 760,104 1000,110" />
                            <polyline fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" strokeLinejoin="round" points="0,182 120,178 240,170 360,158 460,145 540,130 620,150 760,155 1000,160" />
                            <circle cx="540" cy="90" r="5" fill="#ff6900" stroke="white" strokeWidth="2" />
                            <CrosshairLine svgX={tooltip.svgX} visible={tooltip.visible} />
                            <text x="0"    y="182" fill="#9ca3af" fontSize="10" fontFamily="Barlow Semi Condensed,sans-serif">Feb 25</text>
                            <text x="540"  y="182" fill="#c45a00" fontSize="10" fontFamily="Barlow Semi Condensed,sans-serif" textAnchor="middle">Mar 15</text>
                            <text x="1000" y="182" fill="#9ca3af" fontSize="10" fontFamily="Barlow Semi Condensed,sans-serif" textAnchor="end">Mar 26</text>
                        </svg>
                        <ChartTooltip tooltip={tooltip} containerWidth={900} />
                    </div>
                </div>

                <div className="roi-panel">
                    {[
                        { lbl: "Best Day — Mar 15", val: "20",     note: "Clicks · 340 impressions" },
                        { lbl: "Best Day CPL",       val: "£18.63", note: "2 conversions that day" },
                        { lbl: "Pipeline ROI",       val: "22x",    note: "£8.6K pipeline vs ad spend" },
                    ].map((r, i) => (
                        <div key={i} className="roi-item">
                            <div className="roi-lbl">{r.lbl}</div>
                            <div className="roi-val" style={{ color: i === 0 ? "var(--text)" : "var(--accent-dark)" }}>{r.val}</div>
                            <div className="roi-note">{r.note}</div>
                        </div>
                    ))}
                </div>

                <div className="sec-hd">
                    <h2>GHL CRM Pipeline</h2>
                    <div className="sec-line" />
                    <span className="badge">Complete, Needs Registering</span>
                </div>

                <div className="pipeline-grid">
                    <div className="pipe-col" style={{ borderTop: "3px solid var(--accent)" }}>
                        <div className="pipe-hd">
                            <div className="pipe-title">Complete, Needs Registering</div>
                            <div className="pipe-summary"><div className="pipe-count">3</div><div className="pipe-val">Opportunities</div></div>
                        </div>
                        <div className="pipe-body">
                            {PIPELINE.map((o, i) => <OppCard key={i} {...o} />)}
                        </div>
                    </div>
                    <div className="pipe-col" style={{ borderTop: "3px solid var(--dark)" }}>
                        <div className="pipe-hd">
                            <div className="pipe-title">Pipeline Breakdown</div>
                            <div className="pipe-summary"><div className="pipe-count">£8,666</div><div className="pipe-val">Total value</div></div>
                        </div>
                        <div className="pipe-body">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                {[{ lbl: "Organic", val: "£5,059", sub: "2 opportunities" }, { lbl: "Referral", val: "£3,607", sub: "1 opportunity" }].map((b, i) => (
                                    <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "14px 16px" }}>
                                        <div style={{ fontFamily: "Barlow Semi Condensed,sans-serif", fontSize: 9, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--ghost)", marginBottom: 6 }}>{b.lbl}</div>
                                        <div style={{ fontFamily: "Barlow Condensed,sans-serif", fontSize: 26, fontWeight: 700, color: "var(--text)" }}>{b.val}</div>
                                        <div style={{ fontSize: 11, color: "var(--ghost)", marginTop: 4 }}>{b.sub}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: "rgba(255,105,0,0.05)", border: "1px solid rgba(255,105,0,0.18)", borderRadius: 7, padding: "14px 16px", marginTop: 8 }}>
                                <div style={{ fontFamily: "Barlow Semi Condensed,sans-serif", fontSize: 9, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--accent-dark)", marginBottom: 8 }}>Campaign Efficiency</div>
                                <div style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.75 }}>
                                    Google Ads delivered <strong style={{ color: "var(--accent-dark)" }}>28 conversions</strong> at <strong style={{ color: "var(--dark)" }}>£39.07 CPL</strong> from <strong style={{ color: "var(--muted)" }}>7,660 impressions</strong>. Best day <strong style={{ color: "var(--accent-dark)" }}>Mar 15</strong> at <strong style={{ color: "var(--accent-dark)" }}>£18.63/lead</strong>.
                                </div>
                            </div>
                            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                                <div>
                                    <div style={{ fontFamily: "Barlow Semi Condensed,sans-serif", fontSize: 9, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--ghost)", marginBottom: 4 }}>Est. Ad Spend</div>
                                    <div style={{ fontFamily: "Barlow Condensed,sans-serif", fontSize: 22, fontWeight: 700, color: "var(--dark)" }}>~£1,094</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontFamily: "Barlow Semi Condensed,sans-serif", fontSize: 9, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--ghost)", marginBottom: 4 }}>Return Ratio</div>
                                    <div style={{ fontFamily: "Barlow Condensed,sans-serif", fontSize: 22, fontWeight: 700, color: "var(--accent-dark)" }}>7.9x</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <div className="f-brand">
                        <div><div className="f-name">Auld Heating &amp; Plumbing</div><div className="f-sub">Google Ads · GoHighLevel CRM · Campaign Report</div></div>
                    </div>
                    <div className="f-right">Google Ads · GoHighLevel CRM<br />Feb 25 – Mar 26, 2026</div>
                </footer>
            </div>
        </div>
    );
}
