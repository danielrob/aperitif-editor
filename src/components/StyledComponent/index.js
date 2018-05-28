import React from 'react'
import { Keyword, Backtick, Input } from 'components'
import { updateDeclaration } from 'duck'
import { connect } from 'react-redux'
import AutosizeInput from 'react-input-autosize'

import TemplateStringTextArea from './TemplateStringTextArea'

class StyledComponent extends React.Component {
  onChange = e => {
    const { updateDeclaration, declarationId } = this.props
    updateDeclaration({ declarationId, text: e.target.value })
  }

  onTagChange = e => {
    const { updateDeclaration, declarationId } = this.props
    updateDeclaration({ declarationId, tag: e.target.value })
  }

  render() {
    const { nameId, tag, text = '  ' } = this.props

    const tagInput = {
      type: 'text',
      value: tag,
      onChange: this.onTagChange,
    }

    return (
      <div>
        <Keyword>const</Keyword> <Input nameId={nameId} /> =
        styled.<AutosizeInput {...tagInput} /><Backtick />
        <TemplateStringTextArea value={text} onChange={this.onChange} />
        <Backtick />
      </div>
    )
  }
}

const mapDispatchToProps = { updateDeclaration }

export default connect(null, mapDispatchToProps)(StyledComponent)
