/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050914',
          900: '#070c1b',
          850: '#0b1226',
          800: '#0f172a',
          700: '#1b253b',
          600: '#25334d',
        },
        gold: {
          300: '#fde047',
          400: '#facc15',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          brand: '#c59b27',
        },
        royal: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          orange: '#f97316',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'hero-pattern': "radial-gradient(ellipse at top, rgba(30, 58, 138, 0.35) 0%, rgba(7, 12, 27, 0.95) 70%)",
        'gold-gradient': "linear-gradient(135deg, #facc15 0%, #d97706 100%)",
        'navy-card': "linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(7, 12, 27, 0.9) 100%)",
      }
    },
  },
  plugins: [],
}
