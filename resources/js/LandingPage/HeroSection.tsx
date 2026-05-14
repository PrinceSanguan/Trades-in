import styles from './HeroSection.module.css';

type HeroSectionProps = {
    brandName: string;
    phone?: string;
    phoneDisplay?: string;
};

export default function HeroSection({ brandName, phone, phoneDisplay }: HeroSectionProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Side - Content */}
                    <div className={styles.content}>
                        <span className={styles.badge}>The UK's #1 Growth System for Trade Businesses</span>
                        
                        <h1 className={styles.title}>
                            The All-In-One Marketing System for UK Trade Businesses Google Ads. Meta Ads. A Dedicated Call Team.
                        </h1>
                        
                        <p className={styles.subtitle}>
                            We manage your entire marketing and customer acquisition system end to end. Google Ads, Meta Ads, CRM, call team, and appointment booking are all handled for you. You show up, quote the job, and grow your revenue.
                        </p>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Exclusive leads via Google Ads & Meta Ads</span>
                            </li>
                            <li className={styles.featureItem}>
                                <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Call team qualifies and books every lead into your calendar</span>
                            </li>
                            <li className={styles.featureItem}>
                                <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Automated CRM handles enquiry to completion, reviews, and reminders</span>
                            </li>
                            <li className={styles.featureItem}>
                                <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Website & SEO built to rank and designed to convert</span>
                            </li>
                        </ul>

                        <div className={styles.guaranteeStrip}>
                            <svg className={styles.guaranteeIcon} aria-hidden="true" fill="#ff7a00" viewBox="0 0 24 24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <p className={styles.guaranteeText}>10X ROI Guaranteed, or the next 3 months are on us.</p>
                        </div>

                        {/* CTA Buttons */}
                        <div className={styles.ctaButtons}>
                            <a href={phone ? `tel:${phone}` : '#lead-form'} className={styles.ctaPhone}>
                                <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Call Now</span>
                            </a>
                            <a href={phone ? `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '44')}` : '#lead-form'} className={styles.ctaWhatsapp} target="_blank" rel="noopener noreferrer">
                                <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

                    {/* Right Side - Video Placeholder */}
                    <div className={styles.videoWrapper}>
                        <div className={styles.videoPlaceholder}>
                            <div className={styles.playButton}>
                                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <p className={styles.videoLabel}>Watch How It Works</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
