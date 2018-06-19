import React from 'react'
import { DragSource } from 'react-dnd'
import { compose } from 'utils'

class DraggableDeclaration extends React.PureComponent {
  render() {
    const { connectDragSource, connectDragPreview } = this.props
    return (
      <React.Fragment>
        {this.props.render(connectDragSource, connectDragPreview)}
      </React.Fragment>
    )
  }
}

/* dnd */
// source
const sourceSpec = {
  beginDrag(props) {
    const { declarationId } = props
    return {
      declarationId,
    }
  },
}

const sourceCollect = (connect) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
})


/* compose export */
export default compose(
  DragSource(({ type }) => type, sourceSpec, sourceCollect),
)(DraggableDeclaration)

