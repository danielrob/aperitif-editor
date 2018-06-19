import T from 'prop-types'
import { forbidExtraProps, or, explicitNull } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DIR, FILE, STYLED_COMPONENT } from 'constantz'
import { changeFile, moveDeclarationToFile, moveFile } from 'duck'
import { makeSelectFile } from 'selectors'
import { filePropTypes } from 'model-prop-types'

import { File } from '../components'

class FileContainer extends React.PureComponent {
  onClickHandler = e => {
    const { changeFile, fileId } = this.props
    e.stopPropagation()
    changeFile(fileId)
  }

  render() {
    const {
      connectDragSource,
      fileId, // dnd only
      declarationIds, // dnd only
      changeFile, // dnd only
      moveDeclarationToFile, // dnd only
      moveFile, // dnd only
      ...props
    } = this.props

    return (
      <File
        innerRef={innerRef => connectDragSource(findDOMNode(innerRef))}
        onClick={this.onClickHandler}
        {...props}
      />
    )
  }
}


/* propTypes */
FileContainer.propTypes = forbidExtraProps({
  // passed by parent / file explorer
  fileId: T.number.isRequired,
  parentName: or([T.string.isRequired, explicitNull()]), // eslint-disable-line
  path: T.arrayOf(T.number),

  // from makeSelectFile
  file: T.shape(filePropTypes).isRequired,

  // mapDispatchToProps
  changeFile: T.func.isRequired,
  moveDeclarationToFile: T.func.isRequired,
  moveFile: T.func.isRequired,

  // injected by React DnD
  connectDragSource: T.func.isRequired,
  connectDragPreview: T.func.isRequired,
  connectDropTarget: T.func.isRequired,
  isDragging: T.bool.isRequired,
})

FileContainer.defaultProps = {
  path: [],
}


/* connect */
const makeMapStateToProps = () => {
  const getFile = makeSelectFile()
  return (state, props) => ({
    file: getFile(state, props),
  })
}

const mapDispatchToProps = { changeFile, moveDeclarationToFile, moveFile }


/* dnd */
// source
const getType = ({ file: { isDirectory } }) => (isDirectory ? DIR : FILE)

const sourceSpec = {
  beginDrag(props) {
    const { file: { fileId, isDirectory, declarationIds, name }, parentName } = props
    const dropName = (name.includes('index') && parentName) || name
    return {
      type: getType(props),
      fileId,
      isDirectory,
      declarationIds,
      dropName,
    }
  },
  canDrag(props) {
    const { file: { fileId, name }, parentName } = props
    return (
      ![1, 2].includes(fileId) &&
      !(!parentName && name === 'index')
    )
  },
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
})

// target
const dropzoneTarget = {
  drop(props, monitor) {
    const { fileId, moveDeclarationToFile, moveFile } = props
    switch (monitor.getItemType()) {
      case DIR:
      case FILE: {
        const { fileId: sourceFileId } = monitor.getItem()
        moveFile({ targetDirectoryId: fileId, sourceFileId })
        break
      }
      case STYLED_COMPONENT: {
        const { declarationId } = monitor.getItem()
        moveDeclarationToFile({ targetDirectoryId: fileId, declarationId })
        break
      }
      // no default
    }
  },

  canDrop(props, monitor) {
    const { fileId, file: { isDirectory }, path = [] } = props
    return (
      isDirectory &&
      monitor.isOver({ shallow: true }) &&
      ![fileId, ...path].includes(monitor.getItem().fileId)
    )
  },
}

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget(),
})

const getTargetTypes = ({ file: { isDirectory } }) => isDirectory ?
  [STYLED_COMPONENT, FILE, DIR] : []


/* compose export */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  DragSource(getType, sourceSpec, sourceCollect),
  DropTarget(getTargetTypes, dropzoneTarget, targetCollect)
)(FileContainer)
