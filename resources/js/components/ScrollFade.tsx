import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type ScrollFadeProps = {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
};

export default function ScrollFade({ children, delay = 0, duration = 0.6 }: ScrollFadeProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
