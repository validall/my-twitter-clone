/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx}", // Убедитесь, что путь к папке app указан
    "./components/**/*.{js,jsx}", // Если компоненты находятся в отдельной папке
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}