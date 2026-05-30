import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'duo-green': '#58CC02',
        'duo-green-shadow': '#58A700',
        'duo-blue': '#1CB0F6',
        'duo-yellow': '#FFC800',
        'duo-red': '#FF4B4B',
        'duo-purple': '#CE82FF',
        'duo-ink': '#3C3C3C',
        'duo-muted': '#777777',
        'duo-surface': '#F7F7F7',
        'duo-border': '#E5E5E5'
      }
    }
  },
  plugins: []
};

export default config;
