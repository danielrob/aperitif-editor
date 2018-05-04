import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { fileTypes } from 'constantz'

import { FileContainer } from '../containers'

class File extends React.Component {
  render() {
    const {
      name,
      parentName,
      type,
      fileChildren,
      isDragging,
      connectDragPreview,
      initial,
    } = this.props
    const switchName = name.includes('index') && !initial

    return (
      <React.Fragment>
        {connectDragPreview(<span>{switchName && isDragging ? parentName : name}</span>, {
          captureDraggingState: true,
        })}
        {type && type !== fileTypes.DIR && `.${type}`}
        {fileChildren.map(fileId => (
          <FileContainer
            key={fileId}
            fileId={fileId}
            parentName={name}
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
  initial: T.bool,
  // Injected by React DnD:
  connectDragPreview: T.func.isRequired,
  isDragging: T.bool.isRequired,
}

File.defaultProps = {
  initial: false,
}
