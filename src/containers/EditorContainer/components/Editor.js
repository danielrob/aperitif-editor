import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
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
  JsonText,
} from 'components'
import {
  STATELESS_FUNCTION_COMPONENT,
  STYLED_COMPONENT,
  CLASS_COMPONENT,
  PROJECT_INDEX,
  JSON_TYPE,
} from 'constantz'

import { Imports, DefaultExport } from './'

const renderers = {
  [STATELESS_FUNCTION_COMPONENT]: StatelessFunctionComponent,
  [STYLED_COMPONENT]: StyledComponent,
  [CLASS_COMPONENT]: ClassComponent,
  [PROJECT_INDEX]: ProjectIndex,
  [JSON_TYPE]: JsonText,
}

class Editor extends React.PureComponent {
  componentDidUpdate() {
    if (!this.props.dragItem) {
      ReactTooltip.rebuild()
    }
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
          getContent={dataTip => <pre>{dataTip}</pre>}
        />
        <br /* The EOF newline. The POSIX standard. https://stackoverflow.com/a/729795/4682556 */ />
      </div>
    )
  }
}

/* propTypes */
Editor.propTypes = forbidExtraProps({
  imports: T.arrayOf(T.object).isRequired,
  declarations: T.arrayOf(T.object).isRequired,
  defaultExport: T.number,
  currentFileId: T.number,
  dragItem: T.bool,
})

Editor.defaultProps = {
  defaultExport: null,
  currentFileId: null,
  dragItem: false,
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
