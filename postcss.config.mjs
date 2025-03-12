
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      content: [
        './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this based on your project structure
      ],
      theme: {
        extend: {
          screens: {
            'sm': '436px',    // Custom small breakpoint
            'md': '850px',    // Custom medium breakpoint
            'lg': '1352px',   // Custom large breakpoint
            'xl': '1400px'
          },
        },
      },
      plugins: [],
    },
  },
};

export default config;