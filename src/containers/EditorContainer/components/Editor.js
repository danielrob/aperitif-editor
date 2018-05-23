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

const Editor = ({ imports, expressions, defaultExport, connectActiveEditorAreaTarget }) =>
  connectActiveEditorAreaTarget(
    <div className="active-zone">
      <Imports key="imports" imports={imports} />
      <br />
      {expressions.map(expression => {
        const Renderer = renderers[expression.type] || Standard
        return (
          <div key={expression.id}>
            <Renderer {...expression} />
            <br />
          </div>
        )
      })}
      <DefaultExport key="defaultExport" name={defaultExport} />
    </div>
  )

export default styled(Editor).as.div`
  background-color: ${theme.colors.white};
  padding: 50px 100px;
  color: ${theme.colors.darkblue};
  min-width: 960px;

  .active-zone {
    display: inline-block;
    padding: 50px 100px;
    margin: -50px -100px;
  }
`
