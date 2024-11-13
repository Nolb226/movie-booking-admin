import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    100: '#d2e9ff',
                    200: '#a5d3ff',
                    300: '#78bcff',
                    400: '#4ba6ff',
                    500: '#1e90ff',
                    600: '#1873cc',
                    700: '#125699',
                    800: '#0c3a66',
                    850: '#092B4C',
                    900: '#061d33',
                    950: '#030E19',
                },

                secondary: {
                    50: '#EAF8FE',
                    100: '#D4F0FD',
                    200: '#A1E2FF',
                    300: '#80D4FF',
                    400: '#58C9FC',
                    500: '#0CAAF2',
                    600: '#0084BF',
                    700: '#036A99',
                    800: '#005880',
                    850: '#04364C',
                    900: '#032433',
                    950: '#061E29',
                },

                highlight: {
                    100: '#fbe3ce',
                    200: '#f6c79e',
                    300: '#f2ab6d',
                    400: '#ed8f3d',
                    500: '#e9730c',
                    600: '#ba5c0a',
                    700: '#8c4507',
                    800: '#5d2e05',
                    900: '#2f1702',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground':
                        'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground':
                        'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            borderColor: {
                main: 'lch(var(--border-color))',
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/typography'),
    ],
}
export default config
