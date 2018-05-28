import React from 'react'
import { Keyword, Backtick, Input } from 'components'
import { updateDeclaration } from 'duck'
import { connect } from 'react-redux'

import TemplateStringTextArea from './TemplateStringTextArea'

class StyledComponent extends React.Component {
  onChange = e => {
    const { updateDeclaration, declarationId } = this.props

    updateDeclaration({ declarationId, text: e.target.value })
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

const mapDispatchToProps = { updateDeclaration }

export default connect(null, mapDispatchToProps)(StyledComponent)
