import * as path from 'node:path'
import { copyFileSync, unlinkSync } from 'node:fs'

export function viteAddDelFile(options) {
  // console.log('command =', options.command)

  if (options.add !== undefined && options.add.length > 0) {
    // console.log('add =', options.add, '  --  taille =', options.add.length)
    // ajout
    for (const optionsKey in options.add) {
      const item = options.add[optionsKey]
      try {
        const dest = (item.dest + '/'+path.basename(item.src)).replace('//', '/')
        console.log('-> viteAddDelFile - add', path.basename(item.src), '  --  destination =', dest)
        copyFileSync(item.src, dest)
      } catch (erreur) {
        console.log('-> viteAddDelFile - add', item.src, ':', erreur)
      }
    }
  }

  if (options.delete !== undefined && options.delete.length > 0) {
    for (const optionsKey in options.delete) {
      const fichier = options.delete[optionsKey]
      try {
        console.log('-> viteAddDelFile -delete ', fichier)
        unlinkSync(fichier)
      } catch (erreur) {
        console.log('-> viteAddDelFile -delete', fichier, ':', erreur)
      }

    }
  }
}
