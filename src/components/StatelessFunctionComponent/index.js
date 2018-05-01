import React from 'react'
import { Line, Keyword } from 'components'
import { ComponentInvocationTreeContainer } from 'containers'
import { INLINE } from 'constantz'

import { Props } from './components'

export default class StatelessFunctionComponent extends React.Component {
  render() {
    const { id, exportType, name, params, invocations, spreadParamIds } = this.props

    const componentInvocations = invocations // TODO => create invocationExpressions index && filter by expression type
    return (
      // stateless function component template:
      <div>
        <Line>
          {exportType === INLINE && <Keyword>export</Keyword>}{' '}
          <Keyword>const</Keyword>{' '}
          {name} = {'({ '}
          <Props params={params} expressionId={id} spreadParamIds={spreadParamIds} />
          {' })'} => (
          {componentInvocations.length > 1 && '['}
        </Line>{' '}
        {componentInvocations.map(({ id }) => <ComponentInvocationTreeContainer key={id} invocationId={id} />)}
        <Line statement>{componentInvocations.length > 1 && ']'})</Line>
      </div>
    )
  }
}
