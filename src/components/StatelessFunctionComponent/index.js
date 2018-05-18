import { partition } from 'lodash'
import React from 'react'
import { Line, Keyword } from 'components'
import { ComponentInvocationTreeContainer } from 'containers'
import { INLINE } from 'constantz'

import { Props } from './components'
import { Input } from './containers'

export default class StatelessFunctionComponent extends React.Component {
  render() {
    const { id, exportType, nameId, declParams: allParams, invocations } = this.props
    const [spreadParams, params] = partition(allParams, p => p.isSpreadMember)

    const componentInvocations = invocations // TODO => create invocationExpressions index && filter by expression type
    return (
      // stateless function component template:
      <div>
        <Line>
          {exportType === INLINE && <Keyword>export</Keyword>}{' '}
          <Keyword>const</Keyword>{' '}
          <Input nameId={nameId} /> =
          <Props params={params} spreadParams={spreadParams} expressionId={id} />
           => (
          {componentInvocations.length > 1 && '['}
        </Line>{' '}
        {componentInvocations.map(({ id }) =>
          <ComponentInvocationTreeContainer key={id} invocationId={id} depth={1} />)
        }
        <Line statement>{componentInvocations.length > 1 && ']'})</Line>
      </div>
    )
  }
}
