import React from 'react'
import { JSX, Props, Semi, Keyword, Input, PropTypes } from 'components'
import { ComponentTypeToggle } from 'containers'
import { INLINE, CLASS_COMPONENT } from 'constantz'

export default class StatelessFunctionComponent extends React.PureComponent {
  render() {
    const { declarationId, exportType, nameId, declParams, invocations } = this.props

    return (
      <div>
        <div>
          {exportType === INLINE && <Keyword>export</Keyword>}{' '}
          <ComponentTypeToggle
            declarationId={declarationId}
            targetType={CLASS_COMPONENT}
            text="const "
          />
          <Input nameId={nameId} /> =
          <Props props={declParams} declarationId={declarationId} parentheses />
           => (
          {invocations.length > 1 && '['}
        </div>{' '}
        {invocations.map(({ id }) =>
          <JSX key={id} invocationId={id} initial />)
        }
        {invocations.length > 1 && ']'})<Semi />
        <PropTypes nameId={nameId} props={declParams} />
      </div>
    )
  }
}
