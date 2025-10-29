/* eslint-disable no-undef */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'toast-slide-in': {
          '0%': { transform: 'translateX(120%)', opacity: '0.2' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'toast-slide-out': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(120%)', opacity: '0' },
        },
      },
      animation: {
        'toast-slide-in': 'toast-slide-in 0.5s cubic-bezier(0.4,0,0.2,1)',
        'toast-slide-out': 'toast-slide-out 0.4s cubic-bezier(0.4,0,0.2,1) forwards',
      },
    },
  },
  plugins: [],
};
