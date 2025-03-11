import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['selector', 'class'],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: 'var(--font-main)'
    		},
    		colors: {
    			drteeth: {
    				'50': '#EAFFFD',
    				'100': '#C9FFFA',
    				'200': '#9AFFF8',
    				'300': '#54FFF6',
    				'400': '#07FFFE',
    				'500': '#00E1EF',
    				'600': '#00B3C8',
    				'700': '#008EA1',
    				'800': '#086B7B',
    				'900': '#0C5D6D',
    				'950': '#003E4C',
    				background: 'var(--background)',
    				foreground: 'var(--foreground)',
    				primary: 'var(--primary)'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		keyframes: {
    			slideIn: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateX(100%)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			}
    		},
    		animation: {
    			slideIn: 'slideIn .25s ease-in-out forwards var(--delay, 0)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
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
    plugins: [require('@tailwindcss/forms'), require("tailwindcss-animate")],
};
export default config;
