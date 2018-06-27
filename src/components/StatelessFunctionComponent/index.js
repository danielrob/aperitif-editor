import React from 'react'
import { JSX, Semi, Keyword } from 'components'
import { ComponentTypeToggle, PropsContainer, PropTypesContainer, NameInput } from 'containers'
import { INLINE, CLASS_COMPONENT } from 'constantz'

export default class StatelessFunctionComponent extends React.PureComponent {
  render() {
    const { declarationId, exportType, nameId, declParamIds, invocations } = this.props

    return (
      <div>
        <div>
          {exportType === INLINE && <Keyword>export</Keyword>}{' '}
          <ComponentTypeToggle
            declarationId={declarationId}
            targetType={CLASS_COMPONENT}
            text="const "
          />
          <NameInput nameId={nameId} /> =
          <PropsContainer declParamIds={declParamIds} declarationId={declarationId} parentheses />
           => (
          {invocations.length > 1 && '['}
        </div>{' '}
        {invocations.map(({ id }) =>
          <JSX key={id} invocationId={id} initial />)
        }
        {invocations.length > 1 && ']'})<Semi />
        <PropTypesContainer nameId={nameId} declParamIds={declParamIds} />
      </div>
    )
  }
}
