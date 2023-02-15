/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      dark: {
        colors: {
          background: '#2f2d2d',
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#3f51b5',
          error: '#da1408',
          warning: '#e1b215',
          info: '#03a9f4',
          success: '#003102'
        }
      },
      light: {
        colors: {
          background: '#f6f3f3',
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#3f51b5',
          error: '#f44336',
          warning: '#e1b215',
          info: '#03a9f4',
          success: '#4caf50'
        }
      },
    },
  },
})
