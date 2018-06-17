import React from 'react'
import { indent } from 'utils'

import { JSX } from 'components'

export default class ClassProperty extends React.Component {
  render() {
    const { invocationIds } = this.props
    return (
      <div>
        {indent(1)}state = {'{'}
        <br />
        {indent(2)}data: <JSX depth={0} invocationId={invocationIds[0]} />,
        <br />
        {indent(1)}
        {'}'}
        <br />
        <br />
      </div>
    )
  }
}
