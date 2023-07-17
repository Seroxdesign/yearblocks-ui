/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "360px",
        // => @media (min-width: 360px) { ... }
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1440px",
        // => @media (min-width: 1440px) { ... }
        "3xl": "1950px",
        // => @media (min-width: 1440px) { ... }
        "4xl": "2450px",
        // => @media (min-width: 1440px) { ... }
      },
      colors: {
        primary: {
          700: withOpacity("--color-primary-700"),
        },
        service: {
          900: withOpacity("--color-service-900"),
          800: withOpacity("--color-service-800"),
          700: withOpacity("--color-service-700"),
          500: withOpacity("--color-service-500"),
        },
      },
      maxWidth: {
        "8xl": "1440px",
      },
    },
  },
  plugins: [],
};
