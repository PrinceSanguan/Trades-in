import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

type BaseProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
};

type ButtonAsLink = BaseProps & {
    href: string;
    onClick?: never;
    type?: never;
    disabled?: boolean;
};

type ButtonAsButton = BaseProps & {
    href?: never;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button(props: ButtonProps) {
    const { variant = 'primary', size = 'md', className, children } = props;
    const classes = clsx(styles.button, styles[variant], size === 'sm' && styles.sm, className);
    const content = (
        <span className={styles.buttonOuter}>
            <span className={styles.buttonInner}>
                <span className={styles.buttonLabel}>{children}</span>
            </span>
        </span>
    );

    if (typeof (props as any).href === 'string') {
        const href = (props as ButtonAsLink).href;
        const disabled = props.disabled === true;
        const isHashLink = href.startsWith('#');
        const isWebExternal = /^https?:\/\//i.test(href);
        const isProtocolLink = /^(tel:|mailto:|sms:)/i.test(href);

        if (isHashLink || isWebExternal || isProtocolLink) {
            return (
                <a
                    href={disabled ? undefined : href}
                    className={classes}
                    aria-disabled={disabled ? 'true' : undefined}
                    tabIndex={disabled ? -1 : undefined}
                    onClick={disabled ? (e) => e.preventDefault() : undefined}
                    rel={isWebExternal ? 'noopener noreferrer' : undefined}
                    target={isWebExternal ? '_blank' : undefined}
                >
                    {content}
                </a>
            );
        }

        return (
            <Link href={href} className={classes} aria-disabled={disabled ? 'true' : undefined}>
                {content}
            </Link>
        );
    }

    return (
        <button type={props.type ?? 'button'} className={classes} onClick={props.onClick} disabled={props.disabled}>
            {content}
        </button>
    );
}
