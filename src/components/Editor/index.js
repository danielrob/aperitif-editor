import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { StatelessFunctionComponent, Standard } from 'components'
import { STATELESS_FUNCTION_COMPONENT } from 'constantz'

import { Imports, DefaultExport } from './components'

const renderers = {
  [STATELESS_FUNCTION_COMPONENT]: StatelessFunctionComponent,
}

const Editor = ({ imports, expressions, defaultExport }) => (
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

export default styled(Editor).as.div`
  background-color: ${theme.colors.white};
  padding: 50px 100px;
  color: ${theme.colors.darkblue};
  >* {
    margin-bottom: 12px;
  }
`
