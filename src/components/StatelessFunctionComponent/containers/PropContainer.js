import { DragSource } from 'react-dnd'
import { PROP } from 'constantz'

import { Prop } from '../components'

/* dnd */
const propSource = {
  beginDrag(props) {
    return {
      ...props,
      type: PROP,
    }
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

/* export */
export default DragSource(PROP, propSource, collect)(Prop)
