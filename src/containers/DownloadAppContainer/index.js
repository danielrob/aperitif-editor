import React from 'react'
import { connect } from 'react-redux'

import { selectFiles, selectRootFiles, selectNames } from 'selectors'
import { createStructuredSelector } from 'reselect'

import DownloadApp from './DownloadApp'

const DownloadAppContainer = props => <DownloadApp {...props} />

const mapStateToProps = createStructuredSelector({
  files: selectFiles,
  rootFiles: selectRootFiles,
  names: selectNames,
})

export default connect(
  mapStateToProps,
  null
)(DownloadAppContainer)
