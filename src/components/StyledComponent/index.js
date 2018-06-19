import React from 'react'
import { connect } from 'react-redux'
import AutosizeInput from 'react-input-autosize'

import { updateDeclaration } from 'duck'
import { Keyword, Backtick, Input, Semi } from 'components'
import { DraggableDeclaration } from 'containers'

import TemplateStringTextArea from './TemplateStringTextArea'

class StyledComponent extends React.PureComponent {
  onChange = e => {
    const { updateDeclaration, declarationId } = this.props
    updateDeclaration({ declarationId, text: e.target.value })
  }

  onTagChange = e => {
    const { updateDeclaration, declarationId } = this.props
    updateDeclaration({ declarationId, tag: e.target.value })
  }

  render() {
    const { declarationId, nameId, type, tag, text = '  ' } = this.props

    const tagInput = {
      type: 'text',
      value: tag,
      onChange: this.onTagChange,
    }

    return (
      <div>
        <DraggableDeclaration
          type={type}
          declarationId={declarationId}
          render={(connectDragSource, connectDragPreview) => connectDragSource(
            <span>
              <Keyword>const </Keyword>
              {connectDragPreview(<div style={{ display: 'inline', userSelect: 'all' }}><Input nameId={nameId} /> </div>)}
            </span>
          )}
        />
        {' '}=
        styled.<AutosizeInput {...tagInput} /><Backtick />
        <TemplateStringTextArea value={text} onChange={this.onChange} />
        <Backtick />
        <Semi />
      </div>
    )
  }
}

const mapDispatchToProps = { updateDeclaration }

export default connect(null, mapDispatchToProps)(StyledComponent)
