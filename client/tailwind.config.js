module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      'mobile': {'max': '425px'},
      // => @media (max-width: 425px) { ... }

      'tablet': {'min': '426px', 'max': '768px'},
      // => @media (min-width: 426px and max-width: 768px) { ... }

      'laptop': {'min': '769px', 'max': '1024px'},
      // => @media (min-width: 769px and max-width: 1024px) { ... }

      'desktop': {'min': '1025px', 'max': '1280px'},
      // => @media (min-width: 1025px and max-width: 1280px) { ... }

      '2xl': {'min': '1281px'},
      // => @media (min-width: 1281px) { ... }
    },
    extend: {
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  // Removed below lines to fix the login form look errors.
  // [require("tailwind-scrollbar"), require('flowbite/plugin')]
  plugins: [require("tailwind-scrollbar")],
};
