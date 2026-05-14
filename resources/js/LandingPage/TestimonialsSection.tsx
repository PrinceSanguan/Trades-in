import Container from './ui/Container';
import styles from './TestimonialsSection.module.css';

export type Testimonial = {
    name: string;
    location: string;
    quote: string;
};

export type TestimonialsSectionProps = {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    ratingText: string;
    subtitle: string;
    testimonials: Testimonial[];
    phone?: string;
};

export default function TestimonialsSection({
    eyebrow,
    title,
    titleEmphasis,
    ratingText,
    subtitle,
    testimonials,
    phone,
}: TestimonialsSectionProps) {
    const wa = phone ? `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '44')}` : '#contact';
    return (
        <section className={styles.section} aria-labelledby="testimonials-title">
            <Container size="wide">
                <header className={styles.header}>
                    <span className={styles.eyebrow}>{eyebrow}</span>
                    <h2 className={styles.title} id="testimonials-title">
                        {title} <span className={styles.emphasis}>{titleEmphasis}</span>
                    </h2>
                    <div className={styles.ratingRow} aria-label="Rating">
                        <span className={styles.stars} aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"/>
                                </svg>
                            ))}
                        </span>
                        <span className={styles.ratingText}>{ratingText}</span>
                    </div>
                    <p className={styles.subtitle}>{subtitle}</p>
                </header>

                <div className={styles.grid}>
                    {testimonials.map((t) => (
                        <article key={t.name} className={styles.card}>
                            <div className={styles.cardStars} aria-hidden="true">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"/>
                                    </svg>
                                ))}
                            </div>
                            <p className={styles.quote}>“{t.quote}”</p>
                            <div className={styles.person}>
                                <div className={styles.avatar} aria-hidden="true">
                                    {t.name.slice(0, 1).toUpperCase()}
                                </div>
                                <div>
                                    <div className={styles.name}>{t.name}</div>
                                    <div className={styles.location}>{t.location}</div>
                                </div>
                            </div>
                        </article>
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
            </Container>
        </section>
    );
}
