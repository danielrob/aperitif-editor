import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { DropTarget } from 'react-dnd'

import { selectRootFiles } from 'selectors'
import { DIR, FILE } from 'constantz'
import { compose } from 'utils'
import { moveFile } from 'duck'

import { FileExplorer } from './components'

const FileExplorerContainer = props => (
  <div>
    {props.connectDropTarget(<div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />)}
    <FileExplorer {...props} />
  </div>
)

const mapStateToProps = createStructuredSelector({
  rootFiles: selectRootFiles,
})

const mapDispatchToProps = { moveFile }

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
