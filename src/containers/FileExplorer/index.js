import React from 'react'

import FileExplorerWrapper from './FileExplorerWrapper'

export default class FileExplorer extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { ...props } = this.props

    return (
      <FileExplorerWrapper>
         hello?
      </FileExplorerWrapper>
    )
  }
}
