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
        dark: {
          primary: '#1E2B3A',       // Fundo principal escuro
          secondary: '#0F1A2A',     // Barra lateral escura
          accent: '#2196F3',        // Azul de destaque
          card: '#2A3A4D',          // Cor dos cards
          hover: '#3A4A5D',         // Cor de hover
          text: '#E0E0E0',          // Texto principal
          muted: '#94A3B8',         // Texto secundário
          border: '#334155',        // Bordas
          footer: '#0F1A2A',        // Rodapé
          header: '#0F1A2A',        // Cabeçalho
          button: '#2A3A4D',        // Cor do botão  
        }
      }
    },
  },
  plugins: [],
}