import stackBlitz from '@stackblitz/sdk'
import flatten from 'flat'

export default function toStackBlitz(fileTree) {
  const files = Object.entries(flatten(fileTree, { delimiter: '/' }))
    .reduce((out, [name, value]) => {
      out[name.replace('|', '.')] = value // eslint-disable-line no-param-reassign
      return out
    }, {})

  stackBlitz.openProject({
    files,
    title: 'string',
    description: 'string',
    template: 'create-react-app',
    tags: [],
    dependencies: {
      react: 'latest',
      'react-dom': 'latest',
      'styled-components': 'latest',
      'prop-types': 'latest',
    },
    // settings: {
    //   compile: {
    //     trigger: 'auto' | 'keystroke' | 'save',
    //     action: 'hmr' | 'refresh',
    //     clearConsole: boolean,
    //   },
    // },
  },
  {
    openFile: '', // Show a specific file on page load
    newWindow: true, // Open in new window or in current window
    hideDevTools: true, // Hide the debugging console
    devToolsHeight: 0, // Set the height of the debugging console
  })
}
