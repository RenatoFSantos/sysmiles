import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            fontFamily: {
                sans: 'var(--font-main)',
            },
            colors: {
                drteeth: {
                    background: 'var(--background)',
                    foreground: 'var(--foreground)',
                    primary: 'var(--primary)',
                    50: '#EAFFFD',
                    100: '#C9FFFA',
                    200: '#9AFFF8',
                    300: '#54FFF6',
                    400: '#07FFFE',
                    500: '#00E1EF',
                    600: '#00B3C8',
                    700: '#008EA1',
                    800: '#086B7B',
                    900: '#0C5D6D',
                    950: '#003E4C',
                },
            },
            keyframes: {
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(100%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            animation: {
                slideIn: 'slideIn .25s ease-in-out forwards var(--delay, 0)',
            },
        },
    },
    screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
    },
    plugins: [require('@tailwindcss/forms')],
};
export default config;
