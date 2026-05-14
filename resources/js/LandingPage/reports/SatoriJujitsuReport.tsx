import { useState } from "react";

interface LeadCardProps { name: string; val: string; src?: string; }
function LeadCard({ name, val, src = "● Facebook" }: LeadCardProps) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="lead-card"
            style={{ background: hovered ? "#fff" : undefined, borderColor: hovered ? "rgba(17,24,39,0.2)" : undefined, cursor: "default" }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div>
                <div className="lead-name">{name}</div>
                <div className="lead-src">{src}</div>
            </div>
            <div className="lead-val">{val}</div>
        </div>
    );
}

interface CampRowProps { name: string; live?: boolean; leads: string; reach: string; freq: string; cpl: string; cplClass: string; spent: string; impr: string; hovered: boolean; onEnter: () => void; onLeave: () => void; }
function CampRow({ name, live, leads, reach, freq, cpl, cplClass, spent, impr, hovered, onEnter, onLeave }: CampRowProps) {
    return (
        <div className="ct-row" style={{ background: hovered ? "var(--surface)" : undefined, cursor: "default" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div className="ct-name"><div className={"status-dot " + (live ? "dot-live" : "dot-off")} />{name}</div>
            <div className="ct-cell">{leads}</div>
            <div className="ct-cell">{reach}</div>
            <div className="ct-cell">{freq}</div>
            <div className="ct-cell"><span className={cplClass}>{cpl}</span></div>
            <div className="ct-cell">{spent}</div>
            <div className="ct-cell">{impr}</div>
        </div>
    );
}

export default function SatoriJujitsuReport() {
    const [activeKpi, setActiveKpi] = useState<number | null>(null);
    const [activeRow, setActiveRow] = useState<number | null>(null);

    const kpis = [
        { label: "Total Leads",  val: "54",    note: "Lead form results",   accent: "#ff6900" },
        { label: "Cost / Lead",  val: "£5.81", note: "Kids campaign CPL",   accent: "#c45a00" },
        { label: "Spend",        val: "£313",  note: "Total amount spent",  accent: "#374151" },
        { label: "Reach",        val: "21.6K", note: "Unique accounts",     accent: "#4b5563" },
        { label: "Fresh Leads",  val: "153",   note: "Pipeline · £22,800",  accent: "#ff6900" },
    ];

    const statCards = [
        { lbl: "Total Reach",    val: "21.6K", note: "Unique accounts",    color: "#ff6900" },
        { lbl: "Impressions",    val: "63.5K", note: "Total impressions",   color: "#374151" },
        { lbl: "Frequency",      val: "2.94",  note: "Avg per account",     color: "#c45a00" },
        { lbl: "Pipeline Value", val: "£22.8K",note: "Fresh leads value",   color: "#ff6900" },
    ];

    const freshLeads = [
        { name: "Emma Jones",     val: "£150" },
        { name: "Felicity Rees",  val: "£150" },
        { name: "Rachel Hallett", val: "£150" },
        { name: "John Taylor",    val: "£150" },
        { name: "Tanisha Davies", val: "£150" },
        { name: "Amy Sheppard",   val: "£150" },
    ];

    return (
        <div className="rptSatori" style={{ position: "relative", overflow: "hidden" }}>
            <div className="wrapper">
                <div className="hero">
                    <div>
                        <div className="kamon"><div className="kamon-inner" /></div>
                        <div className="hero-eyebrow">
                            <span className="badge badge-gold">Llanelli Dojo</span>
                            <span className="badge badge-red">Facebook Ads</span>
                            <span className="badge badge-teal">GHL CRM</span>
                        </div>
                        <h1>Satori<em>JuJitsu</em></h1>
                        <div className="hero-sub">Kids Enquiries Pipeline · Facebook Lead Generation · Llanelli Branch</div>
                    </div>
                    <div className="hero-right">
                        <div className="period-lbl">Reporting Period</div>
                        <div className="period-val">Feb 25 – Mar 26<br />2026</div>
                    </div>
                </div>

                <div className="kpi-strip">
                    {kpis.map((k, i) => (
                        <div key={i} className={"kpi k" + (i + 1)}
                            style={{ background: activeKpi === i ? "var(--surface)" : undefined, transition: "background 0.18s", cursor: "default" }}
                            onMouseEnter={() => setActiveKpi(i)} onMouseLeave={() => setActiveKpi(null)}>
                            <div className="kpi-lbl">{k.label}</div>
                            <div className="kpi-val" style={{ color: k.accent }}>{k.val}</div>
                            <div className="kpi-note">{k.note}</div>
                        </div>
                    ))}
                </div>

                <div className="sec-head">
                    <h2>Facebook Campaigns</h2>
                    <div className="sec-line" />
                    <span className="badge badge-gold">3 Campaigns · 1 Active</span>
                </div>

                <div className="camp-table">
                    <div className="ct-hdr">
                        <span>Campaign</span><span>Leads</span><span>Reach</span><span>Freq.</span><span>Cost / Lead</span><span>Spent</span><span>Impressions</span>
                    </div>
                    <CampRow
                        name="SATORI | LEADS | ABO | A+ | KIDS"
                        live leads="54" reach="21,612" freq="2.94" cpl="£5.81" cplClass="cpl-chip cpl-gold" spent="£313.94" impr="63,526"
                        hovered={activeRow === 0} onEnter={() => setActiveRow(0)} onLeave={() => setActiveRow(null)}
                    />
                    <CampRow
                        name="SATORI | LEADS | ABO | A+ | ADULTS"
                        leads="—" reach="—" freq="—" cpl="Paused" cplClass="cpl-chip cpl-dim" spent="£0.00" impr="—"
                        hovered={activeRow === 1} onEnter={() => setActiveRow(1)} onLeave={() => setActiveRow(null)}
                    />
                    <CampRow
                        name="SATORI | LEADS | ABO"
                        leads="—" reach="—" freq="—" cpl="£13.33/day" cplClass="cpl-chip cpl-dim" spent="£0.00" impr="—"
                        hovered={activeRow === 2} onEnter={() => setActiveRow(2)} onLeave={() => setActiveRow(null)}
                    />
                    <div className="totals-row">
                        <div className="totals-lbl">3 Campaigns Total</div>
                        <div className="totals-val">54</div>
                        <div className="totals-val">21,612</div>
                        <div className="totals-val">2.94</div>
                        <div className="totals-val">£5.81</div>
                        <div className="totals-val">£313.94</div>
                        <div className="totals-val">63,526</div>
                    </div>
                </div>

                <div className="sec-head">
                    <h2>Kids Enquiries Pipeline</h2>
                    <div className="sec-line" />
                    <span className="badge badge-teal">223+ Opportunities</span>
                </div>

                <div className="pipeline-grid">
                    <div className="pipe-col" style={{ borderTop: "2px solid var(--accent)" }}>
                        <div className="pipe-hd">
                            <div><div className="pipe-title">Fresh Lead</div></div>
                            <div className="pipe-meta"><strong>153</strong> Opportunities · £22,800</div>
                        </div>
                        <div className="pipe-body">
                            {freshLeads.map((l, i) => <LeadCard key={i} name={l.name} val={l.val} />)}
                            <div className="more-pill">+ 147 more fresh leads</div>
                        </div>
                    </div>

                    <div className="pipe-col" style={{ borderTop: "2px solid var(--dark)" }}>
                        <div className="pipe-hd">
                            <div><div className="pipe-title">Campaign Summary</div></div>
                            <div className="pipe-meta"><strong>54</strong> Leads Generated</div>
                        </div>
                        <div className="pipe-body">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 4 }}>
                                {statCards.map((s, i) => (
                                    <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px" }}>
                                        <div style={{ fontFamily: "Barlow Semi Condensed,sans-serif", fontSize: 9, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--ghost)", marginBottom: 6 }}>{s.lbl}</div>
                                        <div style={{ fontFamily: "Barlow Condensed,sans-serif", fontSize: 26, fontWeight: 700, color: s.color }}>{s.val}</div>
                                        <div style={{ fontSize: 11, color: "var(--ghost)", marginTop: 4 }}>{s.note}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: "rgba(255,105,0,0.04)", border: "1px solid rgba(255,105,0,0.14)", borderRadius: 6, padding: "14px 16px", marginTop: 4 }}>
                                <div style={{ fontFamily: "Barlow Semi Condensed,sans-serif", fontSize: 9, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--accent-dark)", marginBottom: 6 }}>Efficiency Highlight</div>
                                <div style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.7 }}>
                                    At <strong style={{ color: "var(--accent-dark)" }}>£5.81 per lead</strong>, the Kids campaign generated{" "}
                                    <strong style={{ color: "var(--dark)" }}>54 qualified enquiries</strong> from a{" "}
                                    <strong style={{ color: "var(--muted)" }}>£313.94 spend</strong> — delivering{" "}
                                    <strong style={{ color: "var(--accent-dark)" }}>£22,800</strong> in pipeline opportunity.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <div className="f-brand">
                        <div className="f-kamon"><div className="f-kamon-star" /></div>
                        <div>
                            <div className="f-name">Satori JuJitsu</div>
                            <div className="f-tagline">Llanelli · Campaign Performance Report</div>
                        </div>
                    </div>
                    <div className="f-right">FACEBOOK ADS · GOHIGHLEVEL CRM<br />FEB 25 – MAR 26, 2026</div>
                </footer>
            </div>
        </div>
    );
}
