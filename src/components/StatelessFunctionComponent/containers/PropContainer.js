import { DragSource } from 'react-dnd'
import { PROP } from 'constantz'
import { getPropType } from 'utils'

import { Prop } from '../components'

/* dnd */
const propSource = {
  beginDrag(props) {
    return {
      ...props,
      type: PROP,
      propType: getPropType(props.payload),
    }
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

/* export */
export default DragSource(PROP, propSource, collect)(Prop)
