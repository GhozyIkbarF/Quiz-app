import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', ...defaultTheme.fontFamily.sans]
  		},
  		colors: {
  			main: '#FFDC58',
  			mainAccent: '#ffc800',
  			overlay: 'rgba(0,0,0,0.8)',
  			bg: '#FEF2E8',
  			text: '#000',
  			border: '#000',
  			darkBg: '#374151',
  			darkText: '#eeefe9',
  			darkBorder: '#000',
  			secondaryBlack: '#212121'
  		},
  		borderRadius: {
  			base: '10px'
  		},
  		boxShadow: {
  			light: '0px 4px 0px 0px #000',
  			dark: '0px 4px 0px 0px #000'
  		},
  		translate: {
  			boxShadowX: '0px',
  			boxShadowY: '4px',
  			reverseBoxShadowX: '0px',
  			reverseBoxShadowY: '-4px'
  		},
  		fontWeight: {
  			base: '400',
  			heading: '600'
  		},
  		screens: {
  			w700: {
  				max: '700px'
  			},
  			w500: {
  				max: '500px'
  			},
  			w400: {
  				max: '400px'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  darkMode: ['class', 'class'],
}