import React from 'react'
import { Keyword, Backtick, Input } from 'components'
import { changeDeclarationText } from 'duck'
import { connect } from 'react-redux'

import TemplateStringTextArea from './TemplateStringTextArea'

class StyledComponent extends React.Component {
  onChange = e => {
    const { changeDeclarationText, declarationId } = this.props

    changeDeclarationText({ declarationId, value: e.target.value })
  }

  render() {
    const { nameId, tag, text = '  ' } = this.props

    return (
      <div>
        <Keyword>const</Keyword> <Input nameId={nameId} /> = styled.{tag}<Backtick />
        <TemplateStringTextArea value={text} onChange={this.onChange} />
        <Backtick />
      </div>
    )
  }
}

const mapDispatchToProps = { changeDeclarationText }

export default connect(null, mapDispatchToProps)(StyledComponent)
