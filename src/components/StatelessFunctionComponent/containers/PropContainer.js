import { DragSource } from 'react-dnd'
import { DraggableTypes } from 'constantz'

import { Prop } from '../components'

/* dnd */
const propSource = {
  beginDrag(props) {
    return props
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

/* export */
export default DragSource(DraggableTypes.PROP, propSource, collect)(Prop)
