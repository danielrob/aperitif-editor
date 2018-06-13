import React from 'react'
import { Keyword, Input, ComponentTypeToggle, PropTypes } from 'components'
import { DeclarationContainer } from 'containers'
import { INLINE, STATELESS_FUNCTION_COMPONENT } from 'constantz'
import styled from 'styled-as-components'

import { ClassPropertyDeclarationFactory } from './components'

class ClassComponent extends React.Component {
  render() {
    const { declarationId, exportType, nameId, declParams: props, declarationIds } = this.props
    return (
      <React.Fragment>
        {/* open */}
        {exportType === INLINE && <Keyword>export</Keyword>}{' '}
        <ComponentTypeToggle
          declarationId={declarationId}
          targetType={STATELESS_FUNCTION_COMPONENT}
          text="class "
        />
        <Input nameId={nameId} /> <Keyword> extends </Keyword> React.Component {'{'}
        <br />
        {declarationIds.map(id => (
          <DeclarationContainer
            key={id}
            declarationId={id}
            render={declaration => (
              <ClassPropertyDeclarationFactory thiz={{ props }} {...declaration} />
            )}
          />
        ))}
        {'}'}
        <br />
        <PropTypes nameId={nameId} props={props} />
      </React.Fragment>
    )
  }
}

export default styled(ClassComponent).as.div`

`
