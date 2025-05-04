/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
			clearFont: ['Montserrat', 'sans - serif'],
		},
		extend: {
			colors: {
				blue: '#1890FF',
				green: '#4eb767',
				grey: '#F1F5F9',
				red: '#FF3B30',
				darkGrey: '#0d0d0d3b',
				white: '#FFFFFF',
				'blue-graph': '#19A4D3',
				'red-graph': '#D24619',
				'dark-blue': '#83a2dc',
			},
			screens: {
				largescreen: '2560px',
			},
			animation: {
				'fill-wave': 'fill-wave 5s cubic-bezier(0.58, 0.42, 1, 1) forwards',
				'wave-0': 'wave-0 7s cubic-bezier(0, 0, 0.42, 0.58) infinite',
			},
			keyframes: {
				'fill-wave': {
					from: { backgroundPosition: '-1200px 100%' },
					to: { backgroundPosition: '1200px 100%' },
				},
				'wave-0': {
					to: { backgroundPosition: '1200px 100%' },
				},
			},
		},
	},
	plugins: [],
};
