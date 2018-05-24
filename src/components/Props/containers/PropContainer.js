import T from 'prop-types'
import { DragSource } from 'react-dnd'
import { PROP } from 'constantz'

import { Prop } from '../components'

/* dnd */
const propSource = {
  beginDrag({ id, name, nameId, payload }) {
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

/* export */
export default PropContainer

/* propTypes */
PropContainer.propTypes = {
  id: T.number.isRequired,
  name: T.string.isRequired,
  nameId: T.number.isRequired,
  isLast: T.bool.isRequired,
  isSpreadMember: T.bool.isRequired,
}
