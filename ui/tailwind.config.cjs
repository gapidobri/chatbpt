const colors = require('tailwindcss/colors');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				...colors,
				gray: {
					700: 'rgb(64,65,79)',
					800: 'rgb(52,53,65)',
					900: 'rgb(32,33,35)'
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
