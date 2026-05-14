import '../css/app.css';

import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// Removed initializeTheme since we want to force light mode
// import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Force light mode by ensuring the 'dark' class is not present
document.documentElement.classList.remove('dark');

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name: string) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }: { el: HTMLElement; App: any; props: any }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#000000',
    },
});

// Removed initializeTheme() call to prevent overriding our forced white mode
// initializeTheme();
