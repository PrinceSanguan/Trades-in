import { useEffect } from 'react';
import styles from './LeadCaptureSection.module.css';

export type LeadCaptureSectionProps = {
    title?: string;
    subtitle?: string;
    variant?: 'section' | 'card';
    phone?: string;
    phoneDisplay?: string;
};

const FORM_ID = 'ARtD3aUDjz1TMY7IWJe8';

export default function LeadCaptureSection({ variant = 'section' }: LeadCaptureSectionProps) {

    useEffect(() => {
        // Load the form embed script
        const script = document.createElement('script');
        script.src = 'https://link.msgsndr.com/js/form_embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const iframeEl = (
        <iframe
            src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
            style={{ width: '100%', height: '530px', minHeight: '530px', border: 'none', borderRadius: '0', display: 'block' }}
            id={`inline-${FORM_ID}`}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Choros Marketing Form"
            data-height="530"
            data-layout-iframe-id={`inline-${FORM_ID}`}
            data-form-id={FORM_ID}
            title="Choros Marketing Form"
        />
    );

    if (variant === 'card') {
        return iframeEl;
    }

    return (
        <section className={styles.section} id="lead" aria-label="Contact form">
            <div id="lead-form">{iframeEl}</div>
        </section>
    );
}