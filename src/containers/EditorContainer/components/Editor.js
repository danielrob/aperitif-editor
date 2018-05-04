import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { StatelessFunctionComponent, StyledComponent, Standard } from 'components'
import { STATELESS_FUNCTION_COMPONENT, STYLED_COMPONENT } from 'constantz'

import { Imports, DefaultExport } from './'

const renderers = {
  [STATELESS_FUNCTION_COMPONENT]: StatelessFunctionComponent,
  [STYLED_COMPONENT]: StyledComponent,
}

const Editor = ({ imports, expressions, defaultExport }) => (
  <React.Fragment>
    <Imports key="imports" imports={imports} />
    <br />
    {expressions.map(expression => {
      const Renderer = renderers[expression.type] || Standard
      return <Renderer key={expression.id} {...expression} />
    })}
    <br />
    <DefaultExport key="defaultExport" name={defaultExport} />
  </React.Fragment>
)

export default styled(Editor).as.div`
  background-color: ${theme.colors.white};
  padding: 50px 100px;
  color: ${theme.colors.darkblue};
  min-width: 960px;
`
