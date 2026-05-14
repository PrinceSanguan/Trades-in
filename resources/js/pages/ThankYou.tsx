import { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import LandingPageHeader from '@/LandingPage/LandingPageHeader';
import LandingPageFooter from '@/LandingPage/LandingPageFooter';
import Container from '@/LandingPage/ui/Container';
import Button from '@/LandingPage/ui/Button';
import { getCsrfToken } from '@/LandingPage/lib/csrf';
import styles from './ThankYou.module.css';

/** Meta Pixel (Jasper) — thank-you page only; not loaded on other routes. */
const META_PIXEL_ID_JASPER = '4301040363458742';

type ThankYouProps = {
    sessionId?: string;
    phoneHint?: string;
    verified?: boolean;
    // GHL form redirect params
    email?: string;
    first_name?: string;
    phone?: string;
};

type ApiResponse = { success: boolean; message?: string };

type WindowWithDataLayer = Window & {
    dataLayer?: Record<string, unknown>[];
};

async function postJson<T>(url: string, body: unknown): Promise<T> {
    const token = getCsrfToken();
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'X-CSRF-TOKEN': token } : {}),
            Accept: 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as T;
    if (!res.ok) {
        throw { status: res.status, data };
    }
    return data;
}

export default function ThankYou({ sessionId, phoneHint, verified = false, email = '', first_name = '', phone: ghlPhone = '' }: ThankYouProps) {
    const brandName = import.meta.env.VITE_APP_NAME || 'Your Company';
    const fallbackPhone = '07713845811';
    const fallbackPhoneDisplay = '07713845811';
    const phone = (((import.meta.env.VITE_PUBLIC_PHONE as string | undefined) ?? '').trim() || fallbackPhone) ?? undefined;
    const phoneDisplay = (((import.meta.env.VITE_PUBLIC_PHONE_DISPLAY as string | undefined) ?? '').trim() || fallbackPhoneDisplay) ?? undefined;

    // Detect GHL redirect mode: contact data present in props
    const isGhlMode = !!email || !!first_name || !!ghlPhone;

    const [isVerified, setIsVerified] = useState(verified);
    const [code, setCode] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(5 * 60);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'verified'>('idle');
    const firstFocusRef = useRef<HTMLInputElement | null>(null);

    const pageTitle = `Thank You | ${brandName}`;

    useEffect(() => {
        const w = window as Window & { fbq?: (...args: unknown[]) => void };
        if (w.fbq) {
            w.fbq('track', 'Lead');
            return;
        }

        const scriptId = 'meta-pixel-jasper-thankyou';
        if (document.getElementById(scriptId)) {
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        // Exact Meta snippet (avoids duplicating their loader in TS for ESLint).
        script.textContent =
            "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '" +
            META_PIXEL_ID_JASPER +
            "');fbq('track', 'Lead');";
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        const capiSendKey = `meta-capi-lead:${sessionId ?? 'thank-you'}`;
        if (sessionStorage.getItem(capiSendKey) === '1') {
            return;
        }

        postJson<ApiResponse>('/api/lead/track-meta-lead', {
            email: email || undefined,
            phone: ghlPhone || undefined,
        })
            .then(() => {
                sessionStorage.setItem(capiSendKey, '1');
            })
            .catch(() => {
                // Keep UX resilient if CAPI request fails.
            });
    }, [email, ghlPhone, sessionId]);

    // Fire Enhanced Conversions user_data on mount for GHL forms, then strip PII from URL
    useEffect(() => {
        if (!isGhlMode) return;

        const gtmWindow = window as WindowWithDataLayer;
        gtmWindow.dataLayer = gtmWindow.dataLayer || [];
        gtmWindow.dataLayer.push({
            event: 'ghl_form_submitted',
            user_data: {
                ...(email && { email_address: email }),
                ...(ghlPhone && { phone_number: ghlPhone }),
                ...(first_name && { address: { first_name } }),
            },
        });

        // Remove PII from URL before any subsequent analytics page view fires
        history.replaceState({}, '', '/thank-you');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!sessionId || isVerified) return;
        const timer = window.setInterval(() => {
            setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => window.clearInterval(timer);
    }, [sessionId, isVerified]);

    useEffect(() => {
        if (sessionId && !isVerified) {
            const t = window.setTimeout(() => firstFocusRef.current?.focus(), 300);
            return () => window.clearTimeout(t);
        }
    }, [sessionId, isVerified]);

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');
    const expired = secondsLeft === 0;

    const verify = async () => {
        if (expired || status === 'loading' || !sessionId) return;
        setError(null);
        setStatus('loading');
        try {
            const res = await postJson<ApiResponse>('/api/lead/verify-code', { session_id: sessionId, code });
            if (!res.success) {
                setError(res.message ?? 'Verification failed');
                setStatus('idle');
                return;
            }
            setStatus('verified');
            setIsVerified(true);
            
            // Redirect to home after successful verification
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (e: unknown) {
            const data = typeof e === 'object' && e !== null && 'data' in e ? (e as { data?: { message?: string } }).data : undefined;
            const message = data?.message ?? 'Verification failed';
            setError(message);
            setStatus('idle');
        }
    };

    const handleBackToHome = async () => {
        if (!sessionId) {
            window.location.href = '/';
            return;
        }

        // Trigger webhook 2 as failed/abandoned verification
        try {
            await postJson<ApiResponse>('/api/lead/close-verification', { session_id: sessionId });
        } catch {
            // Intentionally ignore errors - user should still be able to navigate away
        } finally {
            window.location.href = '/';
        }
    };

    // GHL mode: show simple thank you page
    if (isGhlMode) {
        return (
            <>
                <Head title={pageTitle}>
                    <meta name="robots" content="noindex,nofollow" />
                </Head>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID_JASPER}&ev=Lead&noscript=1`}
                        alt=""
                    />
                </noscript>

                <div className={styles.pageWrapper}>
                    <LandingPageHeader brandName={brandName} phone={phone} phoneDisplay={phoneDisplay} />

                    <main className={styles.main}>
                        <Container size="medium">
                            <div className={styles.content}>
                                <div className={styles.checkmark}>
                                    <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                                        <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M14 27l8 8 16-16"/>
                                    </svg>
                                </div>
                                <h1 className={styles.title}>Thank You{first_name ? `, ${first_name}` : ''}!</h1>
                                <p className={styles.subtitle}>
                                    We've received your enquiry.
                                </p>
                                <p className={styles.text}>
                                    Someone from our team will be in touch within 24 hours. We're looking forward to working with you.
                                </p>
                                <div className={styles.actions}>
                                    <a href="/" className={styles.button}>
                                        Return to Homepage
                                    </a>
                                </div>
                            </div>
                        </Container>
                    </main>

                    <LandingPageFooter brandName={brandName} phone={phone} phoneDisplay={phoneDisplay} />
                </div>
            </>
        );
    }

    // Normal OTP verification flow
    return (
        <>
            <Head title={pageTitle}>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${META_PIXEL_ID_JASPER}&ev=Lead&noscript=1`}
                    alt=""
                />
            </noscript>

            <div className={styles.pageWrapper}>
                <LandingPageHeader brandName={brandName} phone={phone} phoneDisplay={phoneDisplay} />

            <main className={styles.main}>
                <Container size="medium">
                    <div className={styles.content}>
                        {!isVerified && sessionId && (
                            <>
                                <h1 className={styles.title}>Thank You for Your Request!</h1>
                                <p className={styles.subtitle}>
                                    We're excited to help you get started.
                                </p>
                                <p className={styles.text}>
                                    To ensure the security of your information and prevent spam, we've sent a verification code{phoneHint ? ` to ${phoneHint}` : ' to your phone'}. 
                                    This quick step helps us confirm it's really you.
                                </p>

                                <div className={styles.verificationForm}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label} htmlFor="verification-code">
                                            Enter your 4-digit code
                                        </label>
                                        <input
                                            ref={firstFocusRef}
                                            id="verification-code"
                                            className={styles.input}
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            pattern="[0-9]{4}"
                                            maxLength={4}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                            aria-invalid={error ? 'true' : 'false'}
                                            disabled={expired}
                                        />
                                        <p className={styles.timer}>
                                            {expired ? 'Code expired' : `Code expires in ${mm}:${ss}`}
                                        </p>
                                        {!expired && (
                                            <p className={styles.note}>
                                                Didn't receive it? Check your messages or spam folder.
                                            </p>
                                        )}
                                    </div>

                                    {expired && <p className={styles.error}>This code expired. Please submit the form again.</p>}
                                    {error && <p className={styles.error}>{error}</p>}
                                    {status === 'verified' && <p className={styles.success}>Verified. You're all set.</p>}

                                    <div className={styles.actions}>
                                        <Button 
                                            variant="primary" 
                                            onClick={verify} 
                                            disabled={expired || status === 'loading' || code.length !== 4}
                                        >
                                            {status === 'loading' ? 'Verifying…' : 'Verify'}
                                        </Button>
                                        <button 
                                            type="button"
                                            onClick={handleBackToHome} 
                                            className={styles.linkButton}
                                        >
                                            Back to Home
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {isVerified && (
                            <>
                                <div className={styles.checkmark}>
                                    <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                                        <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M14 27l8 8 16-16"/>
                                    </svg>
                                </div>
                                <h1 className={styles.title}>You're All Set!</h1>
                                <p className={styles.subtitle}>
                                    Your request has been verified and successfully submitted.
                                </p>
                                <p className={styles.text}>
                                    Thank you for taking the time to reach out to us. We've received your information and our team will review it carefully. 
                                    You can expect to hear from us soon via phone or email.
                                </p>
                                <p className={styles.redirecting}>
                                    Redirecting you back to the homepage...
                                </p>
                            </>
                        )}

                        {!sessionId && !isVerified && (
                            <>
                                <h1 className={styles.title}>Thank You!</h1>
                                <p className={styles.subtitle}>
                                    We appreciate you reaching out to us.
                                </p>
                                <p className={styles.text}>
                                    Your request has been received and our team will get back to you as soon as possible. 
                                    We're committed to providing you with the best service and support.
                                </p>
                                <div className={styles.actions}>
                                    <a href="/" className={styles.button}>
                                        Back to Home
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </Container>
            </main>

                <LandingPageFooter brandName={brandName} phone={phone} phoneDisplay={phoneDisplay} />
            </div>
        </>
    );
}
