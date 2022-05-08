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
      }
    },
  },
  plugins: [],
}
