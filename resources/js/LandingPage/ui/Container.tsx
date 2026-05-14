import type { ElementType, ReactNode } from 'react';
import styles from './Container.module.css';

export type ContainerProps = {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    size?: 'page' | 'wide' | 'medium' | 'narrow';
};

export default function Container({ children, as: Tag = 'div', className, size = 'page' }: ContainerProps) {
    const sizeClass =
        size === 'narrow'
            ? styles.narrow
            : size === 'medium'
              ? styles.medium
              : size === 'wide'
                ? styles.wide
                : styles.page;

    return <Tag className={[styles.container, sizeClass, className].filter(Boolean).join(' ')}>{children}</Tag>;
}
