import React from 'react'
import { connect } from 'react-redux'
import { selectFiles } from 'selectors'
import { createStructuredSelector } from 'reselect'
import DownloadApp from './DownloadApp'

const DownloadAppContainer = props => <DownloadApp {...props} />

const mapStateToProps = createStructuredSelector({
  files: selectFiles,
})

export default connect(
  mapStateToProps,
  null
)(DownloadAppContainer)
