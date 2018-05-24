import { partition } from 'lodash'
import React from 'react'
import { Props, Line, Keyword, Input, ComponentTypeToggle } from 'components'
import { ComponentInvocationTreeContainer } from 'containers'
import { INLINE, CLASS_COMPONENT } from 'constantz'

export default class StatelessFunctionComponent extends React.Component {
  render() {
    const { declarationId, exportType, nameId, declParams: allParams, invocations } = this.props
    const [spreadParams, params] = partition(allParams, p => p.isSpreadMember)

    return (
      <div>
        <Line>
          {exportType === INLINE && <Keyword>export</Keyword>}{' '}
          <ComponentTypeToggle
            declarationId={declarationId}
            targetType={CLASS_COMPONENT}
            text="const "
          />
          <Input nameId={nameId} /> =
          <Props params={params} spreadParams={spreadParams} declarationId={declarationId} />
           => (
          {invocations.length > 1 && '['}
        </Line>{' '}
        {invocations.map(({ id }) =>
          <ComponentInvocationTreeContainer key={id} invocationId={id} depth={1} />)
        }
        <Line statement>{invocations.length > 1 && ']'})</Line>
      </div>
    )
  }
}
