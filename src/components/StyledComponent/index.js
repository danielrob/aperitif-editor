import React from 'react'
import { Keyword, Backtick, Input } from 'components'

import TemplateStringTextArea from './TemplateStringTextArea'

export default class StyledComponent extends React.Component {
  render() {
    const { nameId, tag } = this.props

    return (
      <div>
        <Keyword>const</Keyword> <Input nameId={nameId} /> = styled.{tag}<Backtick />
        <TemplateStringTextArea />
        <Backtick />
      </div>
    )
  }
}
