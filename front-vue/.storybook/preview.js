/** @type { import('@storybook/vue3').Preview } */
import * as bootstrap from '../node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
