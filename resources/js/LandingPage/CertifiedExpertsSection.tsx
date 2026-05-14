import styles from './CertifiedExpertsSection.module.css';

const certs = [
    { name: 'Certification A', icon: 'cloud' },
    { name: 'Certification B', icon: 'bolt' },
    { name: 'Certification C', icon: 'check' },
    { name: 'Certification D', icon: 'hard-hat' },
    { name: 'Certification E', icon: 'graduation' },
    { name: 'Certification F', icon: 'id-card' },
];

const team = [
    { role: 'Technical Lead' },
    { role: 'Surveyor' },
    { role: 'Installation Expert' },
    { role: 'Compliance Officer' },
    { role: 'Project Manager' },
];

function CertIcon({ icon }: { icon: string }) {
    if (icon === 'cloud') return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>;
    if (icon === 'bolt') return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>;
    if (icon === 'check') return <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
    if (icon === 'hard-hat') return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9v1H3v2h18v-2h-2V9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5v1H7V9c0-2.76 2.24-5 5-5zM3 14v2h18v-2H3z"/></svg>;
    if (icon === 'graduation') return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>;
    return <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S14.93 14 13 14s-3.5-1.57-3.5-3.5S11.07 7 13 7zm-8 12v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H5z"/></svg>;
}

type CertifiedExpertsSectionProps = {
    phone?: string;
};

export default function CertifiedExpertsSection({ phone }: CertifiedExpertsSectionProps) {
    const wa = phone ? `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '44')}` : '#contact';

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Certified Experts</h2>
                    <p className={styles.subtitle}>Premium Quality Service from Certified Specialists</p>
                    <p className={styles.description}>
                        When quality matters, you need experts you can trust. Our team holds multiple industry-recognised
                        certifications, ensuring every job is completed to the highest professional standard.
                    </p>
                </div>

                <div className={styles.certGrid}>
                    {certs.map((cert) => (
                        <div key={cert.name} className={styles.certCard}>
                            <div className={styles.certIcon}>
                                <CertIcon icon={cert.icon} />
                            </div>
                            <p className={styles.certName}>{cert.name}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.teamSubtitle}>
                    <h3>Our Certified Specialists</h3>
                </div>

                <div className={styles.teamGrid}>
                    {team.map((member) => (
                        <div key={member.role} className={styles.teamMember}>
                            <div className={styles.teamAvatar}>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <p className={styles.teamRole}>{member.role}</p>
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
