import { type Config } from "tailwindcss"
import plugin from "tailwindcss-animate"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
		colors: {
			// Cores principais
			'primary-blue': '#5A9BF6', // Usada no Header, SearchBar, Footer, Sidebar, etc.
			'secondary-blue': '#4A86E8', // Usada no botão de "Tutorial TeacherDesk" no Header.
			'hover-blue': '#3B76D4', // Usada para hover no botão no Header.
			'hover-dark-blue': '#3B76D4', // Usada no hover do Sidebar e Botões.
	
			'sidebar-bg': '#2F3A46', // Usada no fundo da Sidebar no modo dark.
			'footer-bg': '#4A86E8', // Usada no rodapé da página.
	
			'bg-light': '#E2EAF8', // Usada no fundo do SearchBar.
			'bg-dark': '#2D3748', // Usada no fundo escuro da SearchBar e Sidebar (modo dark).
			'text-dark': '#1A202C', // Usada no texto da SearchBar e Header em modo claro.
			'text-light': '#F7FAFC', // Usada no texto da SearchBar, Header e Footer em modo claro.
			'border-light': '#E2EAF8', // Usada para bordas do SearchBar.
			'border-dark': '#2D3748', // Usada para bordas da SearchBar no modo dark.
	
			// Cores para modos dark e claro
			'dark-bg': '#2D3748', // Usada no fundo no modo dark.
			'dark-text': '#EDF2F7', // Usada no texto no modo dark.
			'dark-hover': '#1A202C', // Usada para hover no modo dark.
	
			// Outras cores
			'card-bg': '#F0F4FF', // Usada como fundo dos Feature Cards no modo claro.
			'card-bg-dark': '#1F2A36', // Usada como fundo dos Feature Cards no modo dark.
			'card-border': '#CBD5E0', // Usada nas bordas dos Feature Cards.
			'card-hover-bg': '#E2EAF8', // Usada como cor de fundo no hover dos Feature Cards.
			'card-text': '#2B6CB0', // Usada no texto dos Feature Cards.
		  },
    },
  },
  plugins: [plugin],
}

export default config
