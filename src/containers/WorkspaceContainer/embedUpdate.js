import getStackBlitzProjectDef from './getStackBlitzProjectDef'

let previousFileTree = null

export default function embedStackBlitz(fileTree, { vm }) {
  const { files } = getStackBlitzProjectDef(fileTree)
  files['note.md'] = '## Note\nChanges in Aperitif will overwrite stackblitz editor changes'

  vm.applyFsDiff({
    create: files,
    destroy: Object.keys(previousFileTree || {}),
  }).then(() => {
    vm.editor.openFile('note.md')
  })

  previousFileTree = files
}
