import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import { DragSource } from 'react-dnd'
import { PROP } from 'constantz'
import ReactTooltip from 'react-tooltip'

import { paramPropTypes } from 'model-prop-types'
import { Prop } from '../components'

/* dnd */
const propSource = {
  beginDrag({ id, name, nameId, payload, declarationId, count }) {
    ReactTooltip.hide() // disable tooltips
    return {
      declarationId,
      paramId: id,
      name,
      nameId,
      payload,
      type: PROP,
      count,
    }
  },
  endDrag() {
    ReactTooltip.show() // enable tooltips
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})


/* compose */
const PropContainer = DragSource(PROP, propSource, collect)(Prop)


/* propTypes */
PropContainer.propTypes = forbidExtraProps({
  declarationId: T.number.isRequired,
  isLast: T.bool.isRequired,
  ...paramPropTypes,
})

PropContainer.defaultProps = {
  count: null,
  assignNameId: null,
  payload: null,
}


/* export */
export default PropContainer
