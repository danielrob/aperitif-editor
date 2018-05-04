import React from 'react'
// import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DraggableTypes } from 'constantz'
// import { moveParamToSpread } from 'duck'

import { File } from '../components'

class FileContainer extends React.Component {
  onClickHandler = e => {
    const { changeFile, file } = this.props
    e.stopPropagation()
    changeFile(file.id)
  }

  render() {
    const { file, connectDragSource, ...props } = this.props

    return (
      <File
        file={file}
        {...props}
        onClick={this.onClickHandler}
        isDirectory={!!file.children.length}
        innerRef={innerRef => connectDragSource(findDOMNode(innerRef))}
      />
    )
  }
}

// /* connect */
// const mapStateToProps = { }

/* dnd */
// source
const getTypes = ({ file }) => (file.children.length ? DraggableTypes.DIR : DraggableTypes.FILE)

const sourceSpec = {
  beginDrag(props) {
    return props
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

/* compose */
export default compose(
  // connect(null, mapStateToProps),
  DragSource(getTypes, sourceSpec, sourceCollect)
  // DropTarget([], dropzoneTarget, targetCollect),
)(FileContainer)
