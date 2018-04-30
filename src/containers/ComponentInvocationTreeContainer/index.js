import { connect } from 'react-redux'
import { createComponentBundle } from 'duck'
import { DropTarget } from 'react-dnd'

import { DraggableTypes } from 'constantz'
import { compose } from 'utils'

import { ComponentInvocationTree } from './components'
import { makeGetInvocation } from './selectors'

/* connect */
const makeMapStateToProps = () => {
  const getInvocation = makeGetInvocation()
  return (state, props) => getInvocation(state, props)
}

const mapDispatchToProps = { createComponentBundle }

/* dnd */
const dropzoneTarget = {}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isSupremeOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

/* compose */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)
)(ComponentInvocationTree)
