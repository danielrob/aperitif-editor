import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { createStructuredSelector } from 'reselect'

import { compose } from 'utils'
import { getCurrentFileImports, getCurrentFileDefaultExport } from 'selectors'
import { PROP } from 'constantz'

import { Editor } from './components'
import { selectCurrentFileExpressions } from './selectors'

const EditorContainer =

class EditorContainer extends React.Component {

  render() {
    const { connectPassiveEditorAreaTarget, isShallowOverPassiveEditorArea, ...props } = this.props
    return connectPassiveEditorAreaTarget(
      <div>
        <Editor {...props} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  imports: getCurrentFileImports,
  expressions: selectCurrentFileExpressions,
  defaultExport: getCurrentFileDefaultExport,
})

const passiveEditorAreaCollect = (connect, monitor) => ({
  connectPassiveEditorAreaTarget: connect.dropTarget(),
  isShallowOverPassiveEditorArea: monitor.isOver({ shallow: true }),
  dragItem: monitor.getItem(),
})

const activeEditorAreaCollect = (connect) => ({
  connectActiveEditorAreaTarget: connect.dropTarget(),
})

/* compose export */
export default compose(
  connect(mapStateToProps),
  DropTarget(PROP, {}, passiveEditorAreaCollect),
  DropTarget(PROP, {}, activeEditorAreaCollect),
)(EditorContainer)
