import { useState } from 'react';
import Button from './ui/Button';
import styles from './PortfolioSection.module.css';
import './reports/reports.css';
import AuldHeatingReport from './reports/AuldHeatingReport';
import AppliedMartialArtsReport from './reports/AppliedMartialArtsReport';
import SatoriJujitsuReport from './reports/SatoriJujitsuReport';
import GoogleAdsCrmReport from './reports/GoogleAdsCrmReport';

function renderReport(id: string) {
    switch (id) {
        case 'auld-heating':       return <AuldHeatingReport />;
        case 'applied-martial-arts': return <AppliedMartialArtsReport />;
        case 'satori-jujitsu':     return <SatoriJujitsuReport />;
        case 'google-ads-crm':     return <GoogleAdsCrmReport />;
        default: return null;
    }
}

type PortfolioSectionProps = {
    phone?: string;
};

export default function PortfolioSection({ phone }: PortfolioSectionProps) {
    const wa = phone ? `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '44')}` : '#contact';
    const [activeTab, setActiveTab] = useState<'case-studies' | 'our-work'>('case-studies');
    const [activeSlide, setActiveSlide] = useState(0);

    const caseStudies = [
        {
            id: 'auld-heating',
            title: 'Auld Heating & Plumbing',
            location: '',
            type: 'Boiler Installation & Servicing · Google Ads · GHL CRM',
            reportUrl: '/reports/auld-heating.html',
            live: true,
        },
        {
            id: 'satori-jujitsu',
            title: 'Satori JuJitsu',
            location: '',
            type: 'Martial Arts · Facebook Ads · GHL CRM',
            reportUrl: '/reports/satori-jujitsu.html',
            live: true,
        },
        {
            id: 'applied-martial-arts',
            title: 'Applied Martial Arts',
            location: '',
            type: 'Martial Arts · Facebook Ads · GHL CRM',
            reportUrl: '/reports/applied-martial-arts.html',
            live: true,
        },
        {
            id: 'google-ads-crm',
            title: 'Google Ads & CRM Pipeline',
            location: '',
            type: 'Google Ads · GoHighLevel CRM',
            reportUrl: '/reports/google-ads-crm-portfolio.html',
            live: true,
        },
    ];

    const liveStudies = caseStudies.filter(s => s.live);
    const totalSlides = liveStudies.length;
    const prevSlide = () => setActiveSlide(i => (i - 1 + totalSlides) % totalSlides);
    const nextSlide = () => setActiveSlide(i => (i + 1) % totalSlides);

    const ourWork = [
        {
            title: 'Google Ads Campaigns',
            description: 'High-intent search campaigns built specifically for trade businesses — targeting buyers ready to book.',
        },
        {
            title: 'Meta Ads & Social',
            description: 'Scroll-stopping ad creatives across Facebook and Instagram — driving exclusive enquiries directly to your landing page.',
        },
        {
            title: 'CRM Dashboards',
            description: 'Full pipeline visibility — every lead tracked from first enquiry to job complete, review requested, and annual reminder sent.',
        },
        {
            title: 'Landing Pages',
            description: 'High-converting pages built for your trade and your area — designed to turn clicks into confirmed bookings.',
        },
        {
            title: 'Google Ads Performance',
            description: 'Real campaign data — CPL, conversion rates, and ROI tracked and reported transparently every single month.',
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Real Work. Real Results.</span>
                    <h2 className={styles.title}>We Don't Just Talk Results. We Prove Them.</h2>
                    <p className={styles.subtitle}>
                        From ad campaigns to closed jobs — here's exactly what we deliver for UK trade businesses every single month.
                    </p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'case-studies' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('case-studies')}
                    >
                        Case Studies
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'our-work' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('our-work')}
                    >
                        Our Work
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {activeTab === 'case-studies' && (
                        <div className={styles.carousel}>
                            <div className={styles.iframeCard}>
                                <div className={styles.iframeChrome}>
                                    <div className={styles.iframeChromeDots}>
                                        <span /><span /><span />
                                    </div>
                                    <div className={styles.iframeChromeTitle}>
                                        {liveStudies[activeSlide].title}
                                    </div>
                                    <div className={styles.iframeChromeRect} />
                                </div>
                                <div className={styles.reportContainer} key={liveStudies[activeSlide].id}>
                                    {renderReport(liveStudies[activeSlide].id)}
                                </div>
                            </div>

                            <div className={styles.carouselNav}>
                                <button className={styles.carouselBtn} onClick={prevSlide} aria-label="Previous">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <div className={styles.carouselDots}>
                                    {liveStudies.map((s, i) => (
                                        <button
                                            key={s.id}
                                            className={`${styles.carouselDot} ${i === activeSlide ? styles.carouselDotActive : ''}`}
                                            onClick={() => setActiveSlide(i)}
                                            aria-label={`Go to ${s.title}`}
                                        />
                                    ))}
                                </div>
                                <button className={styles.carouselBtn} onClick={nextSlide} aria-label="Next">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'our-work' && (
                        <div className={styles.workGrid}>
                            {ourWork.map((work, index) => (
                                <div key={index} className={styles.workCard}>
                                    <h3 className={styles.workTitle}>{work.title}</h3>
                                    <p className={styles.workDescription}>{work.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <p className={styles.closingLine}>
                    Every number is real. Every result is verified. Every client is a UK trade business just like yours.
                </p>

                <div className={styles.ctaButtons}>
                    <a href={phone ? `tel:${phone}` : '#lead-form'} className={styles.ctaPhone}>
                        <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Call Now</span>
                    </a>
                    <a href={wa} className={styles.ctaWhatsapp} target="_blank" rel="noopener noreferrer">
                        <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        <span>WhatsApp</span>
                    </a>
                    <a href="#lead-form" className={styles.ctaQuote}>
                        <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Book Your Free Strategy Call</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
