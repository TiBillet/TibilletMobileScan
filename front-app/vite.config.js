// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import {createHtmlPlugin} from 'vite-plugin-html'
import {viteAddDelFile} from './emuSimu/addDelFile.js'
import dotenv from 'dotenv'

// Utilities
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'

dotenv.config()

// common configuration dev/build
const commonConfig = {
  build: {
    outDir: '../mobile-app/www',
    minify: false // <= dev
  },
  plugins: [
    vue({
      template: {transformAssetUrls}
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  }
}


// https://vitejs.dev/config/
export default defineConfig(({command, mode, ssrBuild}) => {
  if (command === 'serve') {
    // ------ dev ------
    // Change meta et title
    commonConfig.plugins.push(createHtmlPlugin({
      minify: false,
      entry: 'src/main.js',
      template: 'index.html',
      inject: {
        data: {
          title: 'Tibillet mobile scan DEV',
          meta: `<meta http-equiv="Content-Security-Policy" content="connect-src http://localhost:3000 ws://localhost:3000/ ws://filaos.re https://filaos.re; script-src http://localhost:3000 http://localhost:3000/@vite/client http://localhost:3000/@id/__x00__plugin-vuetify:components/VResponsive/VResponsive.sass 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com/; style-src 'self' https://fonts.googleapis.com/ 'unsafe-inline';">`,
          injectScript: '<script type="text/javascript" src="monCordova.js"></script>',
        }
      }
    }))
    // ajout d'un fichier d'émulation/simulation de périphériques android
    commonConfig.plugins.push(viteAddDelFile({
      command,
      add: [
        {
          src: './emuSimu/monCordova.js',
          dest: './public'
        }
      ]
    }))
    return commonConfig
  } else {
    // ------ build ------
    commonConfig.plugins.push(createHtmlPlugin({
      minify: false,
      entry: 'src/main.js',
      template: 'index.html',
      inject: {
        data: {
          title: 'Tibillet mobile scan',
          meta: `<meta http-equiv="Content-Security-Policy" content="connect-src localhost https://filaos.re ws://filaos.re; script-src localhost; font-src 'self' https://fonts.gstatic.com/; style-src 'self' https://fonts.googleapis.com/ 'unsafe-inline';">`,
          injectScript: '<script type="text/javascript" src="cordova.js"></script>',
        }
      }
    }))
    // supprimer des fichiers ajouter pour le développement
    commonConfig.plugins.push(viteAddDelFile({
      command,
      delete: ['./public/monCordova.js']
    }))
    return commonConfig
  }
})
