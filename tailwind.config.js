/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        library: {
          primary: '#6D4C41',    // coffee brown
          secondary: '#A1887F',  // warm brown
          background: '#F5F5DC', // paper beige
          accent: '#D7CCC8',     // light brown
          text: '#2E2E2E',       // dark text
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
