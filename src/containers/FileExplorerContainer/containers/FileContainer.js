import T from 'prop-types'
import { forbidExtraProps, or, explicitNull } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { fileTypesArray, DIR, FILE } from 'constantz'
import { changeFile } from 'duck'

import { makeGetFile } from '../selectors'
import { File } from '../components'

class FileContainer extends React.Component {
  onClickHandler = e => {
    const { changeFile, fileId } = this.props
    e.stopPropagation()
    changeFile(fileId)
  }

  render() {
    const {
      connectDragSource,
      fileId, // eslint-disable-line no-unused-vars
      isCurrent, // eslint-disable-line no-unused-vars
      expressionIds, // eslint-disable-line no-unused-vars
      changeFile, // eslint-disable-line no-unused-vars
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

/* connect */
const makeMapStateToProps = () => {
  const getFile = makeGetFile()
  return (state, props) => getFile(state, props)
}

const mapDispatchToProps = { changeFile }

/* dnd */
// source
const getType = ({ isDirectory }) => (isDirectory ? DIR : FILE)

const sourceSpec = {
  beginDrag(props) {
    const { fileId, isDirectory, expressionIds, name, initial, parentName } = props
    const dropName = (name.includes('index') && !initial) ? parentName : name
    return {
      type: getType(props),
      fileId,
      isDirectory,
      expressionIds,
      dropName,
    }
  },
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
})

// target
// const dropzoneTarget = {
//   drop(props, monitor) {
//     const { expressionId } = props
//     const { id: paramId } = monitor.getItem()
//   },
// }

// const targetCollect = (connect, monitor) => ({
//   connectDropTarget: connect.dropTarget(),
//   isOver: monitor.isOver(),
//   dragItem: monitor.getItem(),
// })

/* compose export */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  DragSource(getType, sourceSpec, sourceCollect)
  // DropTarget([], dropzoneTarget, targetCollect),
)(FileContainer)

/* propTypes */
FileContainer.propTypes = forbidExtraProps({
  // passed by parent / file explorer
  fileId: T.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  parentName: or([T.string.isRequired, explicitNull()]),
  initial: T.bool,

  // from makeGetFile
  name: T.string.isRequired,
  type: T.oneOf(fileTypesArray).isRequired,
  fileChildren: T.arrayOf(T.number).isRequired,
  isDirectory: T.bool.isRequired,
  isCurrent: T.bool.isRequired,
  expressionIds: T.arrayOf(T.number).isRequired,

  // mapDispatchToProps
  changeFile: T.func.isRequired,

  // injected by React DnD
  connectDragSource: T.func.isRequired,
  connectDragPreview: T.func.isRequired,
  isDragging: T.bool.isRequired,
})

FileContainer.defaultProps = {
  initial: false,
}
