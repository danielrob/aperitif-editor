import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import { DragSource } from 'react-dnd'
import { PROP } from 'constantz'
import ReactTooltip from 'react-tooltip'

import { Prop } from '../components'

/* dnd */
const propSource = {
  beginDrag({ id, name, nameId, payload }) {
    ReactTooltip.hide()
    return {
      paramId: id,
      name,
      nameId,
      payload,
      type: PROP,
    }
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
  id: T.number.isRequired,
  name: T.string.isRequired,
  nameId: T.number.isRequired,
  assignNameId: T.number,
  isLast: T.bool.isRequired,
  isSpreadMember: T.bool.isRequired,
  payload: T.any, // eslint-disable-line react/forbid-prop-types
  count: T.number,
})

PropContainer.defaultProps = {
  count: null,
  assignNameId: null,
  payload: null,
}


/* export */
export default PropContainer
