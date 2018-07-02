import flatten from 'flat'

export default function getStackBlitzProjectDef(fileTree) {
  const files = Object.entries(flatten(fileTree, { delimiter: '/' }))
    .reduce((out, [name, value]) => {
      out[name.replace('|', '.')] = value // eslint-disable-line no-param-reassign
      return out
    }, {})

  return {
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
  }
}
