import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  selectCurrentFileId,
  selectNames,
  selectFiles,
  selectImports,
  selectExports,
  selectExpressions,
  selectInvocations,
  selectParams,
  getCurrentFileExpressions,
  getCurrentFileImportsCombined,
  getCurrentFileDefaultExport,
} from 'containers/App/selectors'

import { selectCurrentFileForEditing } from './selectors'
import EditorWrapper from './EditorWrapper'

class Editor extends React.Component {
  render() {
    const { imports, defaultExport, expressions, } = this.props
    return (
      <EditorWrapper>
        {JSON.stringify(imports, null, 2)}
        <br />
        <br />
        {JSON.stringify(expressions, null, 2)}
        <br />
        <br />
        {JSON.stringify(defaultExport, null, 2)}
      </EditorWrapper>
    )
  }
}

const mapStateToProps = selectCurrentFileForEditing

const mapDispatchToProps = dispatch => ({
  createNewChild: payload => dispatch({ type: 'CREATE_CHILD_COMPONENT', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor)
