/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'chevron-hover':
          '0 2px 12px 5px rgba(46,62,72,.12), 0 2px 4px 0 rgba(46,62,72,.12)',
        chevron:
          '0 2px 8px 0 rgba(46,62,72,.12), 0 2px 4px 0 rgba(46,62,72,.12)',
      },
      colors: {
        chevron: 'rgba(46,62,72,.12)',
      },
    },
  },
  plugins: [],
};
