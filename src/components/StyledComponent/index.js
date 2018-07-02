import React from 'react'
import { connect } from 'react-redux'

import { updateDeclaration } from 'duck'
import { Keyword, Backtick, Semi, Input } from 'components'
import { DraggableDeclaration, NameInput } from 'containers'

import TemplateStringTextArea from './TemplateStringTextArea'
import Pre from './Pre'
import TextAreaActivator from './TextAreaActivator'

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
              {connectDragPreview(<span style={{ userSelect: 'all' }}><NameInput nameId={nameId} /> </span>)}
            </span>
          )}
        />
        {' '}={' '}styled.<Input {...tagInput} /><Backtick />
        <TextAreaActivator
          render={({ over, lock, onLock, onUnlock }) => (over || lock) ? (
            <TemplateStringTextArea
              value={text}
              onChange={this.onChange}
              onFocus={onLock}
              onBlur={onUnlock}
            />
          ) : (
            <Pre>{text}</Pre>
          )}
        />
        <Backtick />
        <Semi />
      </div>
    )
  }
}

const mapDispatchToProps = { updateDeclaration }

export default connect(null, mapDispatchToProps)(StyledComponent)
