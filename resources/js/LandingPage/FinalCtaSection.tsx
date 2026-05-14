import LeadCaptureSection from './LeadCaptureSection';
import styles from './FinalCtaSection.module.css';

type TrustBadge = {
    label: string;
    detail: string;
};

export type FinalCtaSectionProps = {
    title: string;
    titleEmphasis?: string;
    subtitle: string;
    description?: string;
    guaranteeTag?: string;
    primaryCta: string;
    phoneCta?: string;
    phoneDisplay?: string;
    trustBadges: TrustBadge[];
};

export default function FinalCtaSection({
    title,
    titleEmphasis,
    subtitle,
    description,
    guaranteeTag,
    phoneCta,
    phoneDisplay,
    trustBadges,
}: FinalCtaSectionProps) {
    return (
        <section className={styles.section} id="contact" aria-labelledby="final-cta-title">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title} id="final-cta-title">
                        {title}
                        {titleEmphasis ? <> <span className={styles.emphasis}>{titleEmphasis}</span></> : null}
                    </h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                    {description && <p className={styles.description}>{description}</p>}
                </div>

                <LeadCaptureSection
                    variant="card"
                    title="Get Your Free Survey Quote"
                    subtitle="Complete the form below for a same-day response"
                    phone={phoneCta}
                    phoneDisplay={phoneDisplay}
                />

                {guaranteeTag ? (
                    <p className={styles.guaranteeTag}>
                        <svg className={styles.guaranteeIcon} aria-hidden="true" fill="#ff7a00" viewBox="0 0 24 24">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        {guaranteeTag}
                    </p>
                ) : null}

                <div className={styles.trustStrip} aria-label="Trust highlights">
                    {trustBadges.map((badge) => (
                        <div key={badge.label} className={styles.trustItem}>
                            <p className={styles.trustLabel}>{badge.label}</p>
                            <p className={styles.trustDetail}>{badge.detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
