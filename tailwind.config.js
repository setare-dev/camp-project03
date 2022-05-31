const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "vazir": ["vazir", ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        'slow': {'0%': {opacity: 0}, '100%': {opacity: 1}},
        'modal': {'0%': {opacity: .5, transform: 'translateY(-50px)'}, '100%': {opacity: 1, transform: 'translateY(0)'}}
      },
      animation: {
        'slow-1000': 'slow 1s linear 1',
        'slow-500': 'slow .5s linear 1',
        'slow-200': 'slow .2s linear 1',
        'slow-100': 'slow .1s linear 1',
        'modal': 'modal .5s ease-in-out 1',
      }
    },
  },
  plugins: [],
}
