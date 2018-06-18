import { partition } from 'lodash'
import React from 'react'
import { JSX, Props, Semi, Keyword, Input, ComponentTypeToggle, PropTypes } from 'components'
import { INLINE, CLASS_COMPONENT } from 'constantz'

export default class StatelessFunctionComponent extends React.PureComponent {
  render() {
    const { declarationId, exportType, nameId, declParams: allParams, invocations } = this.props
    const [spreadParams, params] = partition(allParams, p => p.isSpreadMember)

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
          <Props params={params} spreadParams={spreadParams} declarationId={declarationId} parentheses />
           => (
          {invocations.length > 1 && '['}
        </div>{' '}
        {invocations.map(({ id }) =>
          <JSX key={id} invocationId={id} initial />)
        }
        {invocations.length > 1 && ']'})<Semi />
        <PropTypes nameId={nameId} props={allParams} />
      </div>
    )
  }
}
