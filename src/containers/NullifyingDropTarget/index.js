import React from 'react'
import { DropTarget } from 'react-dnd'

class NullifyingDropTarget extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props

    return connectDropTarget(
      <span>
        {children}
      </span>
    )
  }
}

// target
const dropzoneTarget = {
  drop() {
    // sets monitor.didDrop() to true
  },
}

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget(),
})

export default DropTarget(props => props.type, dropzoneTarget, targetCollect)(NullifyingDropTarget)
