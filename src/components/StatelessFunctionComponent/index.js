import { partition } from 'lodash'
import React from 'react'
import { Line, Keyword, Input } from 'components'
import { ComponentInvocationTreeContainer } from 'containers'
import { INLINE } from 'constantz'

import { Props } from './components'

export default class StatelessFunctionComponent extends React.Component {
  render() {
    const { declarationId, exportType, nameId, declParams: allParams, invocations } = this.props
    const [spreadParams, params] = partition(allParams, p => p.isSpreadMember)

    return (
      <div>
        <Line>
          {exportType === INLINE && <Keyword>export</Keyword>}{' '}
          <Keyword>const</Keyword>{' '}
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
