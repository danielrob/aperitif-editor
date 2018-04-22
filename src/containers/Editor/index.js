import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { StatelessFunctionComponent, Standard } from 'renderers'
import { expressionTypes } from 'constantz'
import { getCurrentFileImports, getCurrentFileDefaultExport } from 'containers/App/selectors'

import { Imports, DefaultExport, EditorWindow } from './components'
import { selectCurrentFileExpressions } from './selectors'

const { STATELESS_FUNCTION_COMPONENT } = expressionTypes

const renderers = {
  [STATELESS_FUNCTION_COMPONENT]: StatelessFunctionComponent,
}

class Editor extends React.Component {
  render() {
    const { imports, expressions, defaultExport } = this.props

    return (
      <EditorWindow>
        {'Coming soon... file type switch?' && (
          <React.Fragment>
            <Imports key="imports" imports={imports} />
            <br />
            {expressions.map(expression => {
              const Renderer = renderers[expression.type] || Standard
              return <Renderer key={expression.id} {...expression} />
            })}
            <DefaultExport key="defaultExport" name={defaultExport} />
          </React.Fragment>
        )}
      </EditorWindow>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  imports: getCurrentFileImports,
  expressions: selectCurrentFileExpressions,
  defaultExport: getCurrentFileDefaultExport,
})

export default connect(
  mapStateToProps,
)(Editor)
