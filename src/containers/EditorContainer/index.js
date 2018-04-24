import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Editor } from 'components'
import { getCurrentFileImports, getCurrentFileDefaultExport } from 'selectors'

import { selectCurrentFileExpressions } from './selectors'

const EditorContainer = props => <Editor {...props} />

const mapStateToProps = createStructuredSelector({
  imports: getCurrentFileImports,
  expressions: selectCurrentFileExpressions,
  defaultExport: getCurrentFileDefaultExport,
})

export default connect(mapStateToProps)(EditorContainer)
