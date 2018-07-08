import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { DropTarget } from 'react-dnd'
import { compose } from 'utils'

import { acceptedDropTypes, getIsValidOver } from '../helpers'
import { CIDropzones } from '../components'

class IntermediaryDropzonesContainer extends React.PureComponent {
  render() {
    const { connectDropTarget, isOverThisDropzone, inline, ...props } = this.props

    return connectDropTarget(
      <div style={{ margin: '-15px', padding: '15px', display: inline ? 'inline-block' : 'block' }}>
        <CIDropzones {...props} shouldDisplay={isOverThisDropzone} />
      </div>
    )
  }
}

IntermediaryDropzonesContainer.propTypes = forbidExtraProps({
  // from parent
  invocationId: T.number.isRequired,
  depth: T.number.isRequired,
  position: T.number.isRequired,

  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  isOverThisDropzone: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),
})

IntermediaryDropzonesContainer.defaultProps = {
  dragItem: null,
}

/*
  dnd
*/
// target
const dropzoneTarget = {}

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverThisDropzone: getIsValidOver(monitor),
  dragItem: monitor.getItem(),
})

/*
  compose export
*/
export default compose(
  DropTarget(acceptedDropTypes, dropzoneTarget, targetCollect)
)(IntermediaryDropzonesContainer)

