import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { createStructuredSelector } from 'reselect'

import { compose } from 'utils'

import { FILE, PROP, STYLED_COMPONENT } from 'constantz'
import { mergeFile, removeProp } from 'duck'
import {
  selectDeclarations,
  selectCurrentFileId,
} from 'selectors'

import {
  getCurrentFileImports,
  getCurrentFileDefaultExport,
  selectCurrentFileDeclarations,
} from './selectors'
import { Editor } from './components'

class EditorContainer extends React.Component {
  render() {
    const {
      connectEditorTarget,
      isOverPassiveEditorArea, // ignore-line no-unused
      currentFileId, // ignore-line no-unused
      projectDeclarations, // ignore-line no-unused
      ...props
    } = this.props
    return connectEditorTarget(
      <div style={{ overflow: 'auto', paddingBottom: '200px' }}>
        <Editor {...props} />
      </div>
    )
  }
}


/* connect */
const mapStateToProps = createStructuredSelector({
  // to inject
  imports: getCurrentFileImports,
  declarations: selectCurrentFileDeclarations,
  defaultExport: getCurrentFileDefaultExport,
  // to use in drop logic
  currentFileId: selectCurrentFileId,
  projectDeclarations: selectDeclarations,
})

const mapDispatchToProps = { mergeFile, removeProp }


/* dnd */
const editorTarget = {
  // canDrop
  canDrop(props, monitor) {
    switch (monitor.getItemType()) {
      case FILE: {
        const { projectDeclarations, imports } = props
        const { declarationIds } = monitor.getItem()

        const styledComponentId = declarationIds
          .find(id => projectDeclarations[id].type === STYLED_COMPONENT)

        const isInSameComponentBundle = imports
          .find(({ declarationIds: dIds }) => (dIds || []).includes(styledComponentId))

        return (
          styledComponentId &&
          isInSameComponentBundle
        )
      }
      default: {
        return true
      }
    }
  },

  // drop
  drop(props, monitor) {
    // This is the fallback drop zone
    if (monitor.didDrop()) {
      return
    }

    switch (monitor.getItemType()) {
      case FILE: {
        const { mergeFile, currentFileId } = props
        const { fileId } = monitor.getItem()

        return mergeFile({
          sourceFileId: fileId,
          targetFileId: currentFileId,
        })
      }

      case PROP: {
        const { removeProp } = props
        const { declarationId, paramId, count } = monitor.getItem()
        return removeProp({
          declarationId,
          paramId,
          count,
        })
      }
      // no default
    }
  },
}

const editorCollect = (connect, monitor) => ({
  connectEditorTarget: connect.dropTarget(),
  isOverPassiveEditorArea: monitor.isOver({ shallow: true }),
  isOverEditor: monitor.isOver(),
  dragItem: monitor.getItem(),
})


/* compose export */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget([FILE, PROP], editorTarget, editorCollect),
)(EditorContainer)
