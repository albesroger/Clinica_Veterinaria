/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
      },
      colors: {
        ink: '#0f172a',
        mist: '#f8fafc',
        river: '#1f6feb',
        dune: '#f2d98f',
        moss: '#0f766e',
        clay: '#f97316',
      },
      boxShadow: {
        glow: '0 0 0 3px rgba(31, 111, 235, 0.25)',
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at top left, rgba(36,111,235,0.25), transparent 45%), radial-gradient(circle at bottom right, rgba(24,118,110,0.25), transparent 45%)',
      },
    },
  },
  plugins: [],
}
