import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { changeName } from 'duck'
import { createStructuredSelector } from 'reselect'
import { makeSelectName } from 'selectors'
import AutosizeInput from 'react-input-autosize'

class Input extends React.PureComponent {
  static defaultProps = {
    shouldActivateOnClick: true,
  }

  state = {
    displayInput: false,
  }

  onClick = () => {
    if (this.props.shouldActivateOnClick) {
      this.setState({ displayInput: true })
    }
  }

  onBlur = () => {
    this.setState({ displayInput: false })
  }

  onChange = e => {
    const { changeName, nameId } = this.props
    const pos = e.target.selectionStart - 1
    const nextName = e.target.value

    if (nextName && !(/^(?![0-9])[a-zA-Z0-9]+$/.exec(nextName))) {
      this.inputRef.setSelectionRange(pos, 0)
      setTimeout(() => this.inputRef.setSelectionRange(pos, 0))
      return
    }

    changeName({ nameId, value: nextName })
  }

  componentDidUpdate() {
    if (this.state.displayInput) {
      if (document.activeElement !== this.inputRef) {
        this.inputRef.focus()
        this.inputRef.setSelectionRange(0, this.inputRef.value.length)
      }
    } else {
      this.inputRef = null
    }
  }

  render() {
    const { name: { value }, pointer } = this.props
    const input = {
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    }

    return (
      this.state.displayInput ?
        <HackAutosizeInput>
          <AutosizeInput inputRef={ref => { this.inputRef = ref }} type="text" {...input} />
        </HackAutosizeInput>
        :
        <Name onClick={this.onClick} pointer={pointer}>{value}</Name>
    )
  }
}

const mapDispatchToProps = { changeName }

const makeMapStateToProps = () => {
  const selectName = makeSelectName()
  return createStructuredSelector({
    name: selectName,
  })
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Input)

const HackAutosizeInput = styled.span`
  div[style] {
    margin-right: ${window.navigator.userAgent.includes('Firefox') ? '-17px' : '-2px'};
  }
`

const Name = styled.span`
  cursor: ${props => props.pointer ? 'pointer' : 'text'};
`
