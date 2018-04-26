import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { changeFile } from 'duck'
import { FileExplorer } from 'components'
import { selectFiles, selectNames, selectRootFiles, selectCurrentFileId } from 'selectors'

const FileExplorerContainer = props => <FileExplorer {...props} />

const mapStateToProps = createStructuredSelector({
  files: selectFiles,
  names: selectNames,
  rootFiles: selectRootFiles,
  currentFileId: selectCurrentFileId,
})

const mapDispatchToProps = { changeFile }

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorerContainer)
