/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        military: {
          bg: '#080C08',
          panel: '#151C14',
          green: '#556B2F',
          olive: '#4B5320',
          khaki: '#B5A76A',
          sand: '#C2B280',
          brown: '#5A4632',
          success: '#5F8C45',
          warning: '#C59B3A',
          critical: '#B63A32',
          text: '#D8DDC8',
          muted: '#7F8975'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
