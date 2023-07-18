/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "footer-bg": "url('../../public/assets/footer.png')",
        "home-bg": "url('../../public/assets/Background.png')",
        "rocket-bg": "url('../../public/assets/BackgroundRocket.png')",
        "about_us-bg": "url('../../public/assets/BackGroundAboutus.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          600: "#032FCA",
          700: "#0204AD",
          800: "#1F0290",
        },
        gray: {
          400: "#ADB5BA",
        },
        text: {
          500: "#42464D",
          600: "#002C66",
        },
        primary: {
          500: "#157AFE",
        },
        purple: {
          500: "#4F1091",
        },
        gray: {
          100: "#FFFFFF",
          200: "#F2F4F6",
          300: "#DEE0E0",
          400: "#ADB5BA",
          500: "#9AA1A6",
          600: "#82888C",
          700: "#687075",
          800: "#353A3D",
          900: "#1B1D1F",
        },
        bg: {
          menu: "#F3F3F3",
          screen: "#FCFBFD",
        },
        success: {
          100: "#D6F2E5",
          200: "#84D8B2",
          300: "#69CFA0",
          400: "#4DC78F",
          500: "#32BE7E",
          600: "#2AA86E",
          700: "#22925F",
          800: "#1B7B4F",
          900: "#14643F",
        },
        danger: {
          100: "#FFDDDA",
          200: "#FF9891",
          300: "#FF8278",
          400: "#FF6B60",
          500: "#FF5447",
          600: "#DF473B",
          700: "#BF3B30",
          800: "#9F2F26",
          900: "#80251D",
        },
        warning: {
          100: "#FFF9DA",
          200: "#FFF2A9",
          300: "#FFEA78",
          400: "#FFE660",
          500: "#FFE247",
          600: "#DFC83B",
          700: "#BFAD30",
          800: "#9F9126",
          900: "#80751D",
        },
        background: "#FCFBFD",
        button: "#032FCA",
      },
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        xxs: "8px",
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
};
