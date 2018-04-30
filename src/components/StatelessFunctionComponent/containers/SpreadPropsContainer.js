
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DraggableTypes } from 'constantz'
import { moveParamToSpread } from 'duck'

import { SpreadProps } from '../components'

class SpreadPropsContainer extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props
    return (
      <SpreadProps
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      >
        {children}
      </SpreadProps>
    )
  }
}

/* connect */
const mapStateToProps = { moveParamToSpread }

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    const { expressionId, moveParamToSpread } = props
    const { id: paramId } = monitor.getItem()
    moveParamToSpread({
      expressionId,
      paramId,
    })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

/* compose */
export default compose(
  connect(null, mapStateToProps),
  DropTarget(DraggableTypes.PROP, dropzoneTarget, collect),
)(SpreadPropsContainer)

