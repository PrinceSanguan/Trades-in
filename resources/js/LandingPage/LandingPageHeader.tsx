import Container from './ui/Container';
import Button from './ui/Button';
import styles from './LandingPageHeader.module.css';

export type LandingPageHeaderProps = {
    brandName: string;
    phone?: string;
    phoneDisplay?: string;
};

export default function LandingPageHeader({ brandName, phone, phoneDisplay }: LandingPageHeaderProps) {
    const hasPhone = Boolean(phone && phone.trim().length > 0);

    return (
        <header className={styles.wrap}>
            <a className={styles.skip} href="#content">
                Skip to content
            </a>
            <Container size="wide">
                <div className={styles.bar}>
                    <a className={styles.brand} href="/" aria-label={`${brandName} home`}>
                        <span className={styles.logoImageWrap}>
                            <img className={styles.logoImage} src="/images/choros-logo.webp" alt={brandName} />
                            <img className={styles.logoImageFiltered} src="/images/choros-logo.webp" alt="" aria-hidden="true" />
                        </span>
                    </a>

                    <div className={styles.actions}>
                        <Button variant="primary" size="sm" href={hasPhone ? `tel:${phone}` : '#lead-form'}>
                            {hasPhone ? `Call${phoneDisplay ? `: ${phoneDisplay}` : ''}` : 'Contact'}
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
}
