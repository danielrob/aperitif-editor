import T from 'prop-types'
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
    const {
      name,
      type,
      fileChildren,
      isDirectory,
      isCurrent, // TODO
      connectDragPreview,
      parentSnapshotElement,
      initial,
    } = this.props
    const useParentSnapshot = name.includes('index') && !initial
    if (useParentSnapshot) {
      connectDragPreview(parentSnapshotElement)
    }

    return (
      <React.Fragment>
        {useParentSnapshot ? name : connectDragPreview(<span ref={this.setRef}>{name}</span>)}
        {type && type !== fileTypes.DIR && `.${type}`}
        {fileChildren.map(fileId => (
          <FileContainer
            key={fileId}
            fileId={fileId}
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

File.propTypes = {
  name: T.string.isRequired,
  fileChildren: T.arrayOf(T.number).isRequired,
  isDirectory: T.bool.isRequired,
  isCurrent: T.bool.isRequired,
  initial: T.bool,
  // Injected by React DnD:
  connectDragPreview: T.func.isRequired,
}

File.defaultProps = {
  initial: false,
}
