import stackblitz from '@stackblitz/sdk'

import getStackBlitzProjectDef from './getStackBlitzProjectDef'

export default function toStackBlitz(fileTree) {
  stackblitz.openProject(getStackBlitzProjectDef(fileTree), {
    openFile: '', // Show a specific file on page load
    newWindow: true, // Open in new window or in current window
    hideDevTools: true, // Hide the debugging console
    devToolsHeight: 0, // Set the height of the debugging console
  })
}
