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
          'footer-bg': "url('../../public/assets/footer.png')",
          'home-bg' : "url('../../public/assets/Background.png')",
          'rocket-bg' : "url('../../public/assets/BackgroundRocket.png')",
          'about_us-bg' : "url('../../public/assets/BackGroundAboutus.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: {
          600 : '#032FCA',
          700 : '#0204AD',
          800 : '#1F0290'
        },
        gray: {
          400 : '#ADB5BA'
        },
        background: '#FCFBFD',
        button: '#032FCA',
      },
      text: {
        
      }
    },
  },
  plugins: [],
}
