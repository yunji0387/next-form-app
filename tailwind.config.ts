import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'white': '#ffffff',
        'light-gray': '#F5F5F5',
        'black': '#000000',
        'light-blue': '#E6F0FF',
        'dark-blue': '#0068FF',
        'yellow': '#FCB527',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      width: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
      },
    },
  },
  plugins: [],
}
export default config
