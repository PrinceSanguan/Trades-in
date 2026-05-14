import { useEffect, useId, useRef, useState } from 'react';
import Button from './ui/Button';
import { getCsrfToken } from './lib/csrf';
import styles from './VerificationModal.module.css';

export type VerificationModalProps = {
    open: boolean;
    sessionId: string;
    phoneHint?: string;
    onClose: () => void;
    onVerified: () => void;
};

type ApiResponse = { success: boolean; message?: string };

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

export default function VerificationModal({ open, sessionId, phoneHint, onClose, onVerified }: VerificationModalProps) {
    const titleId = useId();
    const inputId = useId();
    const firstFocusRef = useRef<HTMLInputElement | null>(null);
    const closeSentRef = useRef(false);

    const [code, setCode] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(5 * 60);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'verified'>('idle');

    useEffect(() => {
        if (!open) return;
        closeSentRef.current = false;
        setCode('');
        setError(null);
        setStatus('idle');
        setSecondsLeft(5 * 60);

        const t = window.setTimeout(() => firstFocusRef.current?.focus(), 50);
        return () => window.clearTimeout(t);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const timer = window.setInterval(() => {
            setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => window.clearInterval(timer);
    }, [open]);

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');
    const expired = secondsLeft === 0;

    const close = async () => {
        if (closeSentRef.current) {
            onClose();
            return;
        }

        closeSentRef.current = true;
        try {
            await postJson<ApiResponse>('/api/lead/close-verification', { session_id: sessionId });
        } catch {
            // Intentionally ignore: closing UX should remain responsive.
        } finally {
            onClose();
        }
    };

    const verify = async () => {
        if (expired || status === 'loading') return;
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
            onVerified();
        } catch (e: any) {
            const message = e?.data?.message ?? 'Verification failed';
            setError(message);
            setStatus('idle');
        }
    };

    const resend = async () => {
        if (expired || status === 'loading') return;
        setError(null);
        setStatus('loading');
        try {
            const res = await postJson<ApiResponse>('/api/lead/resend-code', { session_id: sessionId });
            if (!res.success) {
                setError(res.message ?? 'Could not resend code');
            }
        } catch (e: any) {
            setError(e?.data?.message ?? 'Could not resend code');
        } finally {
            setStatus('idle');
        }
    };

    if (!open) return null;

    return (
        <div className={styles.overlay} role="presentation" onMouseDown={(e) => (e.target === e.currentTarget ? close() : null)}>
            <div
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onKeyDown={(e) => (e.key === 'Escape' ? close() : null)}
            >
                <div className={styles.header}>
                    <div className={styles.topActions}>
                        <h2 className={styles.title} id={titleId}>
                            Verify your phone
                        </h2>
                        <button className={styles.linkBtn} type="button" onClick={close}>
                            Close
                        </button>
                    </div>
                    <p className={styles.subtitle}>
                        Enter the 4-digit code we sent{phoneHint ? ` to ${phoneHint}` : ''}. Expires in {mm}:{ss}.
                    </p>
                </div>

                <div className={styles.body}>
                    <div className={styles.row}>
                        <label className={styles.label} htmlFor={inputId}>
                            Verification code
                        </label>
                        <input
                            ref={firstFocusRef}
                            id={inputId}
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
                        <p className={styles.note}>If you don’t see it, check spam or wait a moment and resend.</p>
                    </div>

                    {expired && <p className={styles.error}>This code expired. Please submit the form again.</p>}
                    {error && <p className={styles.error}>{error}</p>}
                    {status === 'verified' && <p className={styles.success}>Verified. You’re all set.</p>}

                    <div className={styles.actions}>
                        <Button variant="primary" onClick={verify} disabled={expired || status === 'loading' || code.length !== 4}>
                            {status === 'loading' ? 'Verifying…' : 'Verify'}
                        </Button>
                        <Button variant="secondary" onClick={resend} disabled={expired || status === 'loading'}>
                            Resend code
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
