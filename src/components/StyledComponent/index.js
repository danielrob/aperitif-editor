import React from 'react'
import { connect } from 'react-redux'

import { updateDeclaration } from 'duck'
import { Keyword, Backtick, Semi, Input } from 'components'
import { DraggableDeclaration, NameInput } from 'containers'

import TemplateStringTextArea from './TemplateStringTextArea'

class StyledComponent extends React.PureComponent {
  onChange = e => {
    const { updateDeclaration, declarationId } = this.props
    updateDeclaration({ declarationId, text: e.target.value })
  }

  onTagChange = ({ value: tag }) => {
    const { updateDeclaration, declarationId } = this.props
    updateDeclaration({ declarationId, tag })
  }

  render() {
    const { declarationId, nameId, type, tag, text = '  ' } = this.props

    const tagInput = {
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
              {connectDragPreview(<div style={{ display: 'inline', userSelect: 'all' }}><NameInput nameId={nameId} /> </div>)}
            </span>
          )}
        />
        {' '}=
        styled.<Input {...tagInput} /><Backtick />
        <TemplateStringTextArea value={text} onChange={this.onChange} />
        <Backtick />
        <Semi />
      </div>
    )
  }
}

const mapDispatchToProps = { updateDeclaration }

export default connect(null, mapDispatchToProps)(StyledComponent)
