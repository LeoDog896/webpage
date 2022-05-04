const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s infinite',
      },
      fontFamily: {
        "primary": "'Montserrat', sans-serif"
      }
    }
	},

	plugins: []
};

module.exports = config;
