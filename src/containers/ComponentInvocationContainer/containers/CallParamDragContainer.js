import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { DragSource } from 'react-dnd'
import { CALL_PARAM } from 'constantz'

import { compose } from 'utils'
import { callParamPropTypes } from 'model-prop-types'
import { CallParam } from '../components'

const CallParamDragContainer = props => <CallParam {...props} />

/*
  propTypes
*/
CallParamDragContainer.propTypes = forbidExtraProps({
  invocationId: T.number.isRequired,
  spreadPropsIsOverTag: T.bool.isRequired,
  tagHasPropsSpread: T.bool.isRequired,
  callParam: T.shape(callParamPropTypes).isRequired,
  connectDragSource: T.func.isRequired,
})

/*
  dnd - source
*/
const propSource = {
  beginDrag({
    callParam: { id, name, nameId },
    invocationId,
  }) {
    return {
      type: CALL_PARAM,
      paramId: id,
      name,
      nameId,
      sourceInvocationId: invocationId,
    }
  },
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})


/*
  compose export
*/
export default compose(
  DragSource(CALL_PARAM, propSource, sourceCollect),
)(CallParamDragContainer)
