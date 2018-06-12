import React from 'react'
import { indent } from 'utils'

export default class ClassProperty extends React.Component {
  render() {
    const { isStatic } = this.props
    return (
      <div>
        {indent(1)}state = {'{'}
        <br />
        {indent(2)}data: sampleApiResponse,
        <br />
        {indent(1)}
        {'}'}
        <br />
        <br />
      </div>
    )
  }
}
