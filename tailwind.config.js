/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        primary: '#00FF80',
        secondary: '#1AFF9C',
        text: '#C0FFC0',
        error: '#FF0050',
        partial: '#FFD300',
      },
      fontFamily: {
        display: ['Orbitron', 'Share Tech Mono', 'ui-monospace', 'monospace'],
        mono: ['JetBrains Mono', 'Inconsolata', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
