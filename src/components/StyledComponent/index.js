import React from 'react'
import { InvisibleTextArea } from 'components'

export default class StyledComponent extends React.Component {
  render() {
    const { name, tag } = this.props

    return (
      <div>
        const {name} = styled.{tag}`
        <br />
        <InvisibleTextArea />
        <br />
        `
      </div>
    )
  }
}
