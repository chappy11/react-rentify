/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '3sm': {'max': '320px'},
      '2sm': {'min': '321px','max': '640px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }
      'xxsm':{'min':'280px','max':'320px'},
      'xsm': '320px',
      // => @media (min-width: 320px) { ... }

      'sm': {'min': '640px', 'max': '768px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }
  
      'md': {'min': '769px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }
  
      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
  
      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
  
      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }

      'lgn': {'min': '1281px', 'max': '1366px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
    },
  },
  plugins: [],
}
