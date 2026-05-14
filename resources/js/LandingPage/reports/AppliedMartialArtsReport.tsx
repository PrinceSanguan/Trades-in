import { useState } from "react";

interface LeadCardProps { name: string; src: string; srcClass?: string; }
function LeadCard({ name, src, srcClass = "src-fb" }: LeadCardProps) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="lead-card"
            style={{ background: hovered ? "#fff" : undefined, borderColor: hovered ? "rgba(17,24,39,0.2)" : undefined, cursor: "default" }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="lead-top">
                <div className="lead-name">{name}</div>
                <div className="av av-none">—</div>
            </div>
            <div className={"lead-src " + srcClass}>{src}</div>
        </div>
    );
}

interface PipeColProps { title: string; count: string; accentColor: string; children: React.ReactNode; }
function PipeCol({ title, count, accentColor, children }: PipeColProps) {
    return (
        <div className="pipe-col" style={{ borderTop: `2px solid ${accentColor}` }}>
            <div className="pipe-head">
                <div className="pipe-title">{title}</div>
                <div className="pipe-count">{count}</div>
            </div>
            <div className="pipe-cards">{children}</div>
        </div>
    );
}

export default function AppliedMartialArtsReport() {
    const [activeKpi, setActiveKpi] = useState<number | null>(null);
    const [activeRow, setActiveRow] = useState<number | null>(null);

    const kpis = [
        { label: "Total Leads",   src: "FB Ads", value: "60",   sub: "Lead form results",     accent: "#ff6900", barW: "100%", barCol: "rgba(255,105,0,0.35)" },
        { label: "Kids Campaign", src: "FB Ads", value: "9",    sub: "Leads @ £8.70 CPL",     accent: "#c45a00", barW: "30%",  barCol: "rgba(196,90,0,0.35)"   },
        { label: "Main Campaign", src: "FB Ads", value: "51",   sub: "Leads @ £7.37 CPL",     accent: "#374151", barW: "85%",  barCol: "rgba(55,65,81,0.25)"   },
        { label: "Spend",         src: "FB Ads", value: "£454", sub: "Total amount spent",     accent: "#4b5563", barW: "60%",  barCol: "rgba(75,85,99,0.25)"   },
        { label: "Trial Booked",  src: "GHL",    value: "26",   sub: "Pipeline stage",         accent: "#6b7280", barW: "50%",  barCol: "rgba(107,114,128,0.2)" },
    ];

    const rows = [
        { name: "CHOROS || KIDS OFFER || LEADS", results: "9 Leads",  cpl: "£8.70",  cplClass: "cost-chip cost-amber", impr: "12,763", spent: "£78.34",  budget: "Ad set budget" },
        { name: "CHOROS | Leads",                results: "51 Leads", cpl: "£7.37",  cplClass: "cost-chip cost-green", impr: "70,219", spent: "£375.94", budget: "£12.50 / day"  },
    ];

    return (
        <div className="rptAma" style={{ position: "relative", overflow: "hidden" }}>
            <div className="wrapper">
                <div className="hero">
                    <div>
                        <div className="hero-eyebrow">
                            <span className="badge badge-red">● Facebook Ads</span>
                            <span className="badge badge-teal">GHL CRM</span>
                        </div>
                        <h1>Applied<span className="line2">Martial Arts</span></h1>
                    </div>
                    <div className="hero-meta">
                        <div className="period-label">Reporting Period</div>
                        <div className="period-range">Feb 25 – Mar 26, 2026</div>
                    </div>
                </div>

                <div className="kpi-grid">
                    {kpis.map((k, i) => (
                        <div key={i} className="kpi"
                            style={{ background: activeKpi === i ? "var(--surface)" : undefined, transition: "background 0.18s", cursor: "default" }}
                            onMouseEnter={() => setActiveKpi(i)} onMouseLeave={() => setActiveKpi(null)}>
                            <div className="kpi-top">
                                <div className="kpi-label">{k.label}</div>
                                <div className="kpi-src">{k.src}</div>
                            </div>
                            <div className="kpi-value" style={{ color: k.accent }}>{k.value}</div>
                            <div className="kpi-sub">{k.sub}</div>
                            <div className="kpi-bar" style={{ background: k.barCol, width: activeKpi === i ? k.barW : k.barW, transition: "background 0.18s" }} />
                        </div>
                    ))}
                </div>

                <div className="section-head">
                    <h2>Facebook Campaigns</h2>
                    <div className="section-line" />
                    <span className="badge badge-teal">2 Active</span>
                </div>

                <div className="campaign-table">
                    <div className="ct-header">
                        <span>Campaign</span><span>Results</span><span>Cost / Lead</span><span>Impressions</span><span>Spent</span><span>Budget</span>
                    </div>
                    {rows.map((r, i) => (
                        <div key={i} className="ct-row"
                            style={{ background: activeRow === i ? "var(--surface)" : undefined, cursor: "default" }}
                            onMouseEnter={() => setActiveRow(i)} onMouseLeave={() => setActiveRow(null)}>
                            <div className="ct-name"><div className="live-dot" />{r.name}</div>
                            <div className="ct-cell">{r.results}</div>
                            <div className="ct-cell"><span className={r.cplClass}>{r.cpl}</span></div>
                            <div className="ct-cell">{r.impr}</div>
                            <div className="ct-cell">{r.spent}</div>
                            <div className="ct-cell muted">{r.budget}</div>
                        </div>
                    ))}
                </div>

                <div className="section-head">
                    <h2>GHL Opportunity Pipeline</h2>
                    <div className="section-line" />
                    <span className="badge badge-red">55 Total Opps</span>
                </div>

                <div className="pipeline-wrap">
                    <PipeCol title="Trial Class Booked" count="26 Opportunities" accentColor="#ff6900">
                        <LeadCard name="Lizzie"   src="● Facebook" />
                        <LeadCard name="Dougie"   src="● Facebook" />
                        <LeadCard name="Steven"   src="● Facebook" />
                        <LeadCard name="Mark"     src="● Facebook" />
                        <LeadCard name="Jacob"    src="● Facebook" />
                        <div className="more-card">+21 more leads</div>
                    </PipeCol>
                    <PipeCol title="Trial Class Attended" count="15 Opportunities" accentColor="#c45a00">
                        <LeadCard name="Joe Dawson"    src="● Adult NoGi Grappling" srcClass="src-nogi" />
                        <LeadCard name="Bradley"       src="—" />
                        <LeadCard name="harleyfoulkes" src="—" />
                        <LeadCard name="Sergiu Orbu"   src="● Adult NoGi Grappling" srcClass="src-nogi" />
                        <div className="more-card">+11 more leads</div>
                    </PipeCol>
                    <PipeCol title="Pay as you Go" count="3 Opportunities" accentColor="#374151">
                        <LeadCard name="Jack" src="● Facebook" />
                        <LeadCard name="Rhi"  src="● Facebook" />
                        <LeadCard name="Erin" src="● Facebook" />
                    </PipeCol>
                    <PipeCol title="Signed Up" count="11 Opportunities" accentColor="#6b7280">
                        <LeadCard name="Ben Allen" src="● Adult NoGi Grappling" srcClass="src-nogi" />
                        <LeadCard name="Lewis"     src="● Facebook" />
                        <LeadCard name="Charlie"   src="● Facebook" />
                        <LeadCard name="Luca"      src="● Facebook" />
                        <LeadCard name="Radu"      src="● Facebook" />
                        <div className="more-card">+6 more signed up</div>
                    </PipeCol>
                </div>

                <footer>
                    <div className="footer-left">
                        <div className="ama-logo">AMA</div>
                        <div className="ama-full">Applied Martial Arts<br />Campaign Performance Report</div>
                    </div>
                    <div className="footer-right">Facebook Ads · GoHighLevel CRM<br />Feb 25 – Mar 26, 2026</div>
                </footer>
            </div>
        </div>
    );
}
