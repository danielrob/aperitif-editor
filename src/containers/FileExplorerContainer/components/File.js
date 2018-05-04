import React from 'react'
import styled from 'styled-as-components'

import { fileTypes } from 'constantz'

import { FileContainer } from '../containers'

class File extends React.Component {
  constructor() {
    super()
    this.state = {
      ref: null,
    }
  }

  setRef = ref => {
    if (!this.state.ref) {
      this.setState({ ref })
    }
  }

  render() {
    const { file, files, names, changeFile, isDirectory, connectDragPreview, parentSnapshotElement, initial } = this.props
    const name = names[file.nameId]
    const useParentSnapshot = name.includes('index') && !initial
    if (useParentSnapshot) {
      connectDragPreview(parentSnapshotElement)
    }

    return (
      <React.Fragment>
        {useParentSnapshot ? name : connectDragPreview(<span ref={this.setRef}>{name}</span>)}
        {file.type && file.type !== fileTypes.DIR && `.${file.type}`}
        {file.children.map(fileId => (
          <FileContainer
            key={fileId}
            file={files[fileId]}
            files={files}
            names={names}
            changeFile={changeFile}
            parentSnapshotElement={isDirectory && this.state.ref}
          />
        ))}
      </React.Fragment>
    )
  }
}

export default styled(File).as.div`
  cursor: pointer;
  ${props => !props.initial && 'margin-left: 10px;'}
  ${props => props.isDirectory && 'padding: 5px 0;'}
`
