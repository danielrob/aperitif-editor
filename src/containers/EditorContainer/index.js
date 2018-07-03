import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { createStructuredSelector } from 'reselect'
import { KeyPressListeners, AperitifPostContainer } from 'containers'
import { FILE, PROP, STYLED_COMPONENT, COMPONENT_INVOCATION, PARAM_INVOCATION } from 'constantz'
import { compose } from 'utils'
import { mergeFile, removeProp, removeChildInvocation } from 'duck'
import { selectDeclarations, selectCurrentFileId } from 'selectors'
import {
  getCurrentFileImports,
  getCurrentFileDefaultExport,
  selectCurrentFileDeclarations,
} from './selectors'
import { Editor } from './components'


/*
  Component
*/
class EditorContainer extends React.PureComponent {
  render() {
    const {
      connectDropTarget,
      projectDeclarations, // dnd only
      mergeFile, // dnd only
      removeProp, // dnd only
      removeChildInvocation, // dnd only
      ...props
    } = this.props
    return connectDropTarget(
      <div style={{ overflow: 'auto' }}>
        <KeyPressListeners />
        {props.currentFileId ? <Editor {...props} /> : <AperitifPostContainer />}
      </div>
    )
  }
}


/*
  propTypes
*/
EditorContainer.propTypes = forbidExtraProps({
  // parent
  workspaceActions: T.objectOf(T.func),

  // mapStateToProps
  imports: T.arrayOf(T.object).isRequired,
  declarations: T.arrayOf(T.object).isRequired,
  defaultExport: T.number,
  currentFileId: T.number,
  projectDeclarations: T.object.isRequired, // eslint-disable-line react/forbid-prop-types

  // mapDispatchToProps
  mergeFile: T.func.isRequired,
  removeProp: T.func.isRequired,
  removeChildInvocation: T.func.isRequired,

  // dnd
  dragItem: T.bool,
  connectDropTarget: T.func.isRequired,
})

EditorContainer.defaultProps = {
  dragItem: false,
  currentFileId: null,
  defaultExport: null,
  workspaceActions: {},
}


/*
  connect
*/
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
  removeChildInvocation,
}


/*
  dnd
*/
const dropTypes = [FILE, PROP, COMPONENT_INVOCATION, PARAM_INVOCATION]

const dropTarget = {
  canDrop(props, monitor) {
    switch (monitor.getItemType()) {
      case FILE: {
        const { projectDeclarations, imports } = props
        const { declarationIds } = monitor.getItem()

        const styledComponentId = declarationIds.find(
          id => projectDeclarations[id].type === STYLED_COMPONENT
        )

        const isInSameComponentBundle = imports.find(({ declarationIds: dIds }) =>
          (dIds || []).includes(styledComponentId)
        )

        return styledComponentId && isInSameComponentBundle
      }
      default: {
        return true
      }
    }
  },

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
        const { declarationId, paramId, nameId, altIds, invokeCount } = monitor.getItem()
        return removeProp({
          declarationId,
          paramId,
          nameId,
          altIds,
          invokeCount,
        })
      }

      case PARAM_INVOCATION:
      case COMPONENT_INVOCATION: {
        const { removeChildInvocation } = props
        const { sourceInvocationId, sourceParentId } = monitor.getItem()
        return removeChildInvocation({
          sourceInvocationId,
          sourceParentId,
        })
      }
      // no default
    }
  },
}

const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  dragItem: !!monitor.getItem(),
})

/*
  compose export
*/
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(dropTypes, dropTarget, dropCollect)
)(EditorContainer)
