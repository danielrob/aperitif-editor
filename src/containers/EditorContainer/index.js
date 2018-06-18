import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { createStructuredSelector } from 'reselect'

import { compose } from 'utils'

import { FILE, PROP, STYLED_COMPONENT, COMPONENT_INVOCATION } from 'constantz'
import {
  mergeFile,
  removeProp,
  removeComponentInvocation,
} from 'duck'
import {
  selectDeclarations,
  selectCurrentFileId,
} from 'selectors'
import { KeyPressListeners, AperoPostContainer } from 'containers'

import {
  getCurrentFileImports,
  getCurrentFileDefaultExport,
  selectCurrentFileDeclarations,
} from './selectors'
import { Editor } from './components'

class EditorContainer extends React.PureComponent {
  render() {
    const {
      connectDropTarget,
      currentFileId,
      projectDeclarations, // dnd only
      mergeFile, // dnd only
      removeProp, // dnd only
      removeComponentInvocation, // dnd only
      ...props
    } = this.props
    return connectDropTarget(
      <div style={{ overflow: 'auto' }}>
        <KeyPressListeners />
        {currentFileId ? <Editor {...props} /> : <AperoPostContainer />}
      </div>
    )
  }
}


/* propTypes */
EditorContainer.propTypes = forbidExtraProps({
  // mapStateToProps
  imports: T.arrayOf(T.object).isRequired,
  declarations: T.arrayOf(T.object).isRequired,
  defaultExport: T.number,
  currentFileId: T.number,
  projectDeclarations: T.object.isRequired, // eslint-disable-line react/forbid-prop-types

  // mapDispatchToProps
  mergeFile: T.func.isRequired,
  removeProp: T.func.isRequired,
  removeComponentInvocation: T.func.isRequired,

  // dnd
  connectDropTarget: T.func.isRequired,
})

EditorContainer.defaultProps = {
  currentFileId: null,
  defaultExport: null,
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

const mapDispatchToProps = {
  mergeFile,
  removeProp,
  removeComponentInvocation,
}


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
        const { declarationId, paramId, nameId, count } = monitor.getItem()
        return removeProp({
          declarationId,
          paramId,
          nameId,
          count,
        })
      }

      case COMPONENT_INVOCATION: {
        const { removeComponentInvocation } = props
        const { sourceInvocationId, sourceParentId } = monitor.getItem()
        return removeComponentInvocation({
          sourceInvocationId,
          sourceParentId,
        })
      }
      // no default
    }
  },
}

const editorCollect = connect => ({
  connectDropTarget: connect.dropTarget(),
})


/* compose export */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget([FILE, PROP, COMPONENT_INVOCATION], editorTarget, editorCollect),
)(EditorContainer)
