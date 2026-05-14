import styles from './TrustSection.module.css';

const logos = [
    '/images/trust/363351001_121344347693353_7451035572293416588_n-removebg-preview.png',
    '/images/trust/7b2cc8_00ace0962a634054bfccd56a04a65319_mv2-removebg-preview.webp',
    '/images/trust/Aptus-Logo.webp',
    '/images/trust/Bowden.svg',
    '/images/trust/d.webp',
    '/images/trust/direct_boiler_heating_bradford_logo-887b2d2f-1920w-original.webp',
    '/images/trust/IMG-20260128-WA0000__1_-removebg-preview.webp',
    '/images/trust/image001-removebg-preview.webp',
    '/images/trust/JUST_BOILERS-removebg-preview.webp',
    '/images/trust/logo-1-1-1.webp',
    '/images/trust/logo.webp',
    '/images/trust/logo1-removebg-preview.webp',
    '/images/trust/unnamed (2).webp',
    '/images/trust/unnamed (3).webp',
    '/images/trust/we_fit-removebg-preview.avif',
    '/images/trust/Untitled design.webp',
];

export default function TrustSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Real Businesses. Real Results.</h2>
                <p className={styles.subtitle}>Trade Businesses Across the UK Trust Choros.io.</p>
                <p className={styles.stars}>⭐⭐⭐⭐⭐ 5.0/5 from Verified Reviews</p>
                <p className={styles.description}>
                    Choros.io manages the entire marketing and customer acquisition system for boiler engineers, 
                    HVAC installers, solar panel fitters, kitchen installers, plumbers, electricians, and builders 
                    across the UK.
                </p>
                
                <div className={styles.logoGrid}>
                    {logos.map((logo, index) => (
                        <div key={index} className={styles.logoItem}>
                            <img 
                                src={logo} 
                                alt={`Trusted partner ${index + 1}`} 
                                className={[
                                    styles.logo,
                                    logo.includes('Bowden.svg') ? styles.logoLarge : '',
                                    logo.includes('d.webp') ? styles.logoCropLeft : '',
                                ].filter(Boolean).join(' ')} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
