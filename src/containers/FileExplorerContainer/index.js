import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { DropTarget } from 'react-dnd'
import { ActionCreators as UndoableActionCreators } from 'redux-undo'

import { selectRootFiles } from 'selectors'
import { DIR, FILE } from 'constantz'
import { compose } from 'utils'
import { moveFile, resetProject } from 'duck'

import { FileExplorer } from './components'

const FileExplorerContainer = ({
  connectDropTarget,
  moveFile, // dnd only
  ...props
}) => (
  <div>
    {connectDropTarget(<div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />)}
    <FileExplorer {...props} />
  </div>
)

/*
  propTypes
*/
FileExplorerContainer.propTypes = forbidExtraProps({
  // connect
  rootFiles: T.arrayOf(T.number).isRequired,
  resetProject: T.func.isRequired,
  moveFile: T.func.isRequired,
  undo: T.func.isRequired,
  redo: T.func.isRequired,
  // dnd
  connectDropTarget: T.func.isRequired,
})


const mapStateToProps = createStructuredSelector({
  rootFiles: selectRootFiles,
})

const mapDispatchToProps = {
  moveFile,
  resetProject,
  undo: UndoableActionCreators.undo,
  redo: UndoableActionCreators.redo,
}

// target
const dropzoneTarget = {
  drop(props, monitor) {
    const { fileId, moveFile } = props
    const { fileId: sourceFileId } = monitor.getItem()
    moveFile({ targetDirectoryId: fileId, sourceFileId, toRoot: true })
  },
}

const targetCollect = (connect) => ({
  connectDropTarget: connect.dropTarget(),
})

/* compose export */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget([FILE, DIR], dropzoneTarget, targetCollect)
)(FileExplorerContainer)
