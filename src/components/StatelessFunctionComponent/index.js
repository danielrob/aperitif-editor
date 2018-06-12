import { partition } from 'lodash'
import React from 'react'
import { JSX, Props, Line, Keyword, Input, ComponentTypeToggle, PropTypes } from 'components'
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
          <JSX key={id} invocationId={id} initial />)
        }
        <Line statement>{invocations.length > 1 && ']'})</Line>
        <br />
        <PropTypes nameId={nameId} props={allParams} />
      </div>
    )
  }
}
