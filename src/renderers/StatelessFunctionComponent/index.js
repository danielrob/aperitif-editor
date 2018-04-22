import React from 'react'
import { Prop, Line, ComponentInvocation, Keyword } from 'components'
import { INLINE } from 'constantz'

import { sortProps } from './helpers'

export default class StatelessFunctionComponent extends React.Component {
  render() {
    const { exportType, name, params, invocations } = this.props

    const componentInvocations = invocations // TODO => create invocationExpressions index && filter by expression type
    return (
      // stateless function component template:
      <div>
        <Line>
          {exportType === INLINE && <Keyword>export</Keyword>}{' '}
          <Keyword>const</Keyword>{' '}
          {name} = {'({ '}
          <span>{params.sort(sortProps).map(prop => <Prop key={prop.name} {...prop} />)}</span>
          {' })'} => (
          {componentInvocations.length > 1 && '['}
        </Line>{' '}
        {componentInvocations.map(({ id }) => <ComponentInvocation key={id} invocationId={id} />)}
        <Line statement>{componentInvocations.length > 1 && ']'})</Line>
      </div>
    )
  }
}
