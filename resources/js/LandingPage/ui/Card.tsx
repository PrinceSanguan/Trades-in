import { ReactNode } from 'react';
import styles from './Card.module.css';

export type CardProps = {
    children: ReactNode;
    className?: string;
};

export default function Card({ children, className }: CardProps) {
    return <div className={[styles.card, className].filter(Boolean).join(' ')}>{children}</div>;
}

export function CardBody({ children, className }: CardProps) {
    return <div className={[styles.body, className].filter(Boolean).join(' ')}>{children}</div>;
}
