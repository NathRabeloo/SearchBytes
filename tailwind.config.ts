import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita dark mode baseado em classes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
        }
      }
    },
  },
  plugins: [],
}