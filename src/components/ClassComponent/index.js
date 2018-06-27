import React from 'react'
import { Keyword } from 'components'
import { DeclarationContainer, NameInput, ComponentTypeToggle, PropTypesContainer } from 'containers'
import { INLINE, STATELESS_FUNCTION_COMPONENT } from 'constantz'
import styled from 'styled-as-components'

import { ClassPropertyDeclarationFactory } from './components'

class ClassComponent extends React.PureComponent {
  render() {
    const { declarationId, exportType, nameId, declParamIds, declarationIds } = this.props
    return (
      <React.Fragment>
        {/* open */}
        {exportType === INLINE && <Keyword>export</Keyword>}{' '}
        <ComponentTypeToggle
          declarationId={declarationId}
          targetType={STATELESS_FUNCTION_COMPONENT}
          text="class "
        />
        <NameInput nameId={nameId} /> <Keyword> extends </Keyword> React.Component {'{'}
        <br />
        {declarationIds.map(id => (
          <DeclarationContainer
            key={id}
            declarationId={id}
            render={declaration => (
              <ClassPropertyDeclarationFactory thiz={{ declParamIds }} declaration={declaration} />
            )}
          />
        ))}
        {'}'}
        <br />
        <PropTypesContainer nameId={nameId} declParamIds={declParamIds} />
      </React.Fragment>
    )
  }
}

export default styled(ClassComponent).as.div`

`
