import React from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DIR, FILE } from 'constantz'
import { changeFile } from 'duck'

import { makeGetFile } from '../selectors'
import { File } from '../components'

class FileContainer extends React.Component {
  onClickHandler = e => {
    const { changeFile, id } = this.props
    e.stopPropagation()
    changeFile(id)
  }

  render() {
    const { connectDragSource, ...props } = this.props

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
    const { name, initial, parentName } = props

    return {
      ...props,
      dropName: name.includes('index') && !initial ? parentName : name,
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

/* compose */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  DragSource(getType, sourceSpec, sourceCollect)
  // DropTarget([], dropzoneTarget, targetCollect),
)(FileContainer)
