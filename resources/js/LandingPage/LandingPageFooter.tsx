import Container from './ui/Container';
import Button from './ui/Button';
import styles from './LandingPageFooter.module.css';

export type LandingPageFooterProps = {
    brandName: string;
    phone?: string;
    phoneDisplay?: string;
};

export default function LandingPageFooter({ brandName, phone, phoneDisplay }: LandingPageFooterProps) {
    const year = new Date().getFullYear();
    const hasPhone = Boolean(phone && phone.trim().length > 0);

    return (
        <footer className={styles.footer} aria-label="Footer">
            <Container size="wide">
                <div className={styles.row}>
                    <div>
                        <a className={styles.brand} href="/" aria-label={`${brandName} home`}>
                            <span className={styles.logoImageWrap}>
                                <img className={styles.logoImage} src="/images/choros-logo.webp" alt={brandName} />
                                <img className={styles.logoImageFiltered} src="/images/choros-logo.webp" alt="" aria-hidden="true" />
                            </span>
                        </a>
                        <p className={styles.muted}>Complete marketing solutions for UK trade businesses. Exclusive leads, confirmed appointments, and guaranteed growth.</p>
                        <p className={styles.muted}>
                            © {year} {brandName}. All rights reserved.
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        href={hasPhone ? `tel:${phone}` : '#lead-form'}
                        aria-label={hasPhone ? `Call ${brandName}` : `Contact ${brandName}`}
                    >
                        {hasPhone ? `Call${phoneDisplay ? `: ${phoneDisplay}` : ''}` : 'Contact'}
                    </Button>
                </div>
            </Container>
        </footer>
    );
}
