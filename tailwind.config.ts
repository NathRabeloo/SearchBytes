import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: 'class',
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: {
					primary: '#1E2B3A',       // Fundo principal escuro
					secondary: '#0F1A2A',     // Barra lateral escura
					accent: '#2196F3',        // Azul de destaque
					card: '#2A3A4D',          // Cor dos cards
					hover: '#3A4A5D',         // Cor de hover
					text: '#E0E0E0',          // Texto principal
					muted: '#94A3B8',         // Texto secundário
					border: '#334155',        // Bordas
					footer: '#172A45',        // Rodapé
				},

				azulteacherdesk: {
					50: '#eff6ff',
					100: '#dbebfe',
					200: '#bfdbfe',
					300: '#93c2fd',
					400: '#60a5fa',
					500: '#3b8ff6',
					600: '#257eeb',
					700: '#1d71d8',
					800: '#1e5faf',
					900: '#1e4e8a',
					950: '#173254',
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},

	plugins: [require("tailwindcss-animate")],
};
export default config;