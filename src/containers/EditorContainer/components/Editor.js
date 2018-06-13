import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'
import ReactTooltip from 'react-tooltip'

import {
  StatelessFunctionComponent,
  ClassComponent,
  StyledComponent,
  ProjectIndex,
  Standard,
} from 'components'
import {
  STATELESS_FUNCTION_COMPONENT,
  STYLED_COMPONENT,
  CLASS_COMPONENT,
  PROJECT_INDEX,
} from 'constantz'

import { Imports, DefaultExport } from './'

const renderers = {
  [STATELESS_FUNCTION_COMPONENT]: StatelessFunctionComponent,
  [STYLED_COMPONENT]: StyledComponent,
  [CLASS_COMPONENT]: ClassComponent,
  [PROJECT_INDEX]: ProjectIndex,
}

class Editor extends React.Component {
  keydown = (event) => {
    if (event.keyCode === 27) {
      document.activeElement.blur()
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keydown, false)
  }
  componentDidUpdate() {
    ReactTooltip.rebuild()
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown, false)
  }
  render() {
    const { imports, declarations, defaultExport } = this.props
    return (
      <div className="active-zone">
        <Imports key="imports" imports={imports} />
        {!!imports.length && <br />}
        {declarations.map(declaration => {
          const { type, declarationId } = declaration
          const Renderer = renderers[type] || Standard
          return (
            <div key={declarationId}>
              <Renderer {...declaration} />
              <br />
            </div>
          )
        })}
        <DefaultExport nameId={defaultExport} />
        <ReactTooltip
          id="prop"
          effect="solid"
          delayShow={100}
          // type="success"
          getContent={dataTip => <pre>{dataTip}</pre>}
        />
      </div>
    )
  }
}


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
