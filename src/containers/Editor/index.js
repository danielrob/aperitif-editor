import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import styled from 'styled-as-components'

import { StatelessFunctionComponent, Standard } from 'renderers'
import { expressionTypes } from 'constantz'
import { getCurrentFileImports, getCurrentFileDefaultExport } from 'containers/App/selectors'
import { addClassNames } from 'utils'

import { Imports, DefaultExport } from './components'
import { selectCurrentFileExpressions } from './selectors'

const { STATELESS_FUNCTION_COMPONENT } = expressionTypes

const renderers = {
  [STATELESS_FUNCTION_COMPONENT]: StatelessFunctionComponent,
}

class Editor extends React.Component {
  render() {
    const { imports, expressions, defaultExport } = this.props

    return (
      'Coming soon... file type switch?' &&
      <React.Fragment>
        <Imports key="imports" imports={imports} />
        <br />
        {expressions.map(expression => {
          const Renderer = renderers[expression.type] || Standard
          return <Renderer key={expression.id} {...expression} />
        })}
        <DefaultExport key="defaultExport" name={defaultExport} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  imports: getCurrentFileImports,
  expressions: selectCurrentFileExpressions,
  defaultExport: getCurrentFileDefaultExport,
})

export default connect(mapStateToProps)(styled(Editor).as.div`
  background-color: ${props => props.theme.colors.white};
  padding: 50px 100px;
  color: ${props => props.theme.colors.darkblue};
  >* {
    margin-bottom: 12px;
  }
`)
