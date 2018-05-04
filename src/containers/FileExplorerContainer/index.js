import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectRootFiles } from 'selectors'

import { FileExplorer } from './components'

const FileExplorerContainer = props => <FileExplorer {...props} />

const mapStateToProps = createStructuredSelector({
  rootFiles: selectRootFiles,
})

export default connect(mapStateToProps)(FileExplorerContainer)
