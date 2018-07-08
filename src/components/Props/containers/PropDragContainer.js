import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { DragSource } from 'react-dnd'
import { PROP } from 'constantz'
import ReactTooltip from 'react-tooltip'

import { declParamPropTypes } from 'model-prop-types'
import { Prop } from '../components'

const PropContainer = props => <Prop {...props} />

/*
  propTypes
*/
PropContainer.propTypes = forbidExtraProps({
  declarationId: T.number.isRequired,
  prop: T.shape(declParamPropTypes).isRequired,
  skipFinalComma: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
})

/*
  dnd
*/
const propSource = {
  beginDrag({ prop: { id, nameId, name, payload, invokeCount, altIds }, declarationId }) {
    ReactTooltip.hide() // disable tooltips
    return {
      declarationId,
      paramId: id,
      name,
      nameId,
      payload,
      type: PROP,
      invokeCount,
      altIds,
    }
  },
  endDrag() {
    ReactTooltip.show() // enable tooltips
  },
}

const collect = connect => ({
  connectDragSource: connect.dragSource(),
})

/*
  compose export
*/
export default DragSource(PROP, propSource, collect)(PropContainer)
