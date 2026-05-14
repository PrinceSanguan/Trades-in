import styles from './PricingSection.module.css';

type PricingCard = {
    icon: 'search' | 'tools' | 'door' | 'clipboard';
    title: string;
    price: string;
    priceSuffix?: string;
    features: string[];
    popular?: boolean;
};

function PriceIcon({ icon }: { icon: string }) {
    if (icon === 'search') return <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;
    if (icon === 'tools') return <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
    if (icon === 'door') return <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>;
    return <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>;
}

type PricingSectionProps = { phone?: string };

export default function PricingSection({ phone }: PricingSectionProps) {
    const wa = phone ? `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '44')}` : '#contact';

    const cards: PricingCard[] = [
        {
            icon: 'search',
            title: 'Initial Assessment',
            price: 'From [Price]',
            priceSuffix: '/visit',
            features: ['Professional evaluation', 'Detailed report', 'Expert recommendations'],
        },
        {
            icon: 'tools',
            title: 'Standard Service',
            price: 'On Request',
            features: ['Full service delivery', 'Quality workmanship', 'Reliable results'],
            popular: true,
        },
        {
            icon: 'door',
            title: 'Premium Service',
            price: 'From [Price]',
            priceSuffix: '/job',
            features: ['Complete solution', 'Certified work', 'Full documentation'],
        },
        {
            icon: 'clipboard',
            title: 'Ongoing Maintenance',
            price: 'From [Price]',
            priceSuffix: '/visit',
            features: ['Regular inspections', 'Compliance checks', 'Maintenance reports'],
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Transparent Pricing</h2>
                    <p className={styles.subtitle}>Clear pricing for every service level</p>
                </div>

                <div className={styles.grid}>
                    {cards.map((card) => (
                        <div key={card.title} className={styles.card}>
                            {card.popular && <span className={styles.popularBadge}>POPULAR</span>}
                            <div className={styles.iconWrapper}>
                                <PriceIcon icon={card.icon} />
                            </div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>{card.price}</span>
                                {card.priceSuffix && <span className={styles.priceSuffix}>{card.priceSuffix}</span>}
                            </div>
                            <ul className={styles.featureList}>
                                {card.features.map((f) => (
                                    <li key={f} className={styles.featureItem}>
                                        <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <a href="#lead-form" className={styles.getQuoteBtn}>
                                <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Get Quote</span>
                            </a>
                        </div>
                    ))}
                </div>

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
