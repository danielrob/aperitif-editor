import stackblitz from '@stackblitz/sdk'

import getStackBlitzProjectDef from './getStackBlitzProjectDef'

export default function embedStackBlitz(fileTree) {
  const def = getStackBlitzProjectDef(fileTree)
  def.files['note.md'] = '## Note\nChanges in Aperitif will overwrite stackblitz editor changes'
  stackblitz.embedProject(
    document.getElementById('stackBlitzEmbed'),
    def,
    {
      openFile: 'note.md',
      view: 'preview',
      height: '100%',
      width: '100%',
      hideExplorer: false,
      hideNavigation: true,
      forceEmbedLayout: true, // Disables the full stackblitz UI on larger screen sizes
    }
  )
}
