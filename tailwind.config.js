/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1C2B39',
          50: '#EEF1F4',
          100: '#D6DCE3',
          200: '#AEB9C6',
          300: '#8697A9',
          400: '#5E748C',
          500: '#3D5266',
          600: '#283C4F',
          700: '#1C2B39',
          800: '#141F2A',
          900: '#0D151D',
        },
        paper: {
          DEFAULT: '#FAF7F0',
          dim: '#F2EDE0',
        },
        ledger: {
          red: '#B33A3A',
          redDark: '#8E2C2C',
          green: '#3F7D58',
          greenDark: '#2F5F42',
          gold: '#C9962C',
          slate: '#6B7280',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 10px rgba(28,43,57,0.06), 0 10px 30px rgba(28,43,57,0.05)',
        card: '0 1px 3px rgba(28,43,57,0.08), 0 8px 24px rgba(28,43,57,0.06)',
        glow: '0 0 0 1px rgba(201,150,44,0.25), 0 8px 24px rgba(201,150,44,0.15)',
      },
      backgroundImage: {
        'ledger-lines':
          'repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(28,43,57,0.055) 28px)',
        'ledger-lines-dark':
          'repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(255,255,255,0.045) 28px)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        rise: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
      },
      animation: {
        rise: 'rise 0.5s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
