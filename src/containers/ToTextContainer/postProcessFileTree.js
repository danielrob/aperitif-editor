import { RESOLVE_ALIASES } from 'constantz'

import indexHtml from './indexHtml'

/**
 * postProcessFileTree:
 * - adds index.html
 * - adds index.js files for top level components / containers folders
 * - adds package.json
 */
/* eslint-disable no-param-reassign */
export default function postProcessFileTree(fileTree, semis) {
  // index.html
  fileTree['index.html'] = indexHtml

  // indexes
  Object.entries(fileTree).forEach(([name, value]) => {
    if (RESOLVE_ALIASES.includes(name)) {
      fileTree[name]['index|js'] = Object.keys(value).sort().reduce((out, key) => {
        const name = key.split('|')[0]
        const exportLine = `export { default as ${name} } from './${name}'${semis ? ';' : ''}`
        return out ? `${out}\n${exportLine}` : exportLine
      }, '')
    }
  })
  return fileTree
}
