import T from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import AutosizeInput from 'react-input-autosize'

export default class Input extends React.PureComponent {
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
    const { onChange, nameId } = this.props
    const pos = e.target.selectionStart - 1
    const nextName = e.target.value

    if (nextName && !(/^(?![0-9])[a-zA-Z0-9]+$/.exec(nextName))) {
      this.inputRef.setSelectionRange(pos, 0)
      setTimeout(() => this.inputRef.setSelectionRange(pos, 0))
      return
    }

    onChange({ nameId, value: nextName })
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
    const { value, pointer } = this.props
    const input = {
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    }

    return (
      this.state.displayInput ? (
        <HackAutosizeInput>
          <AutosizeInput inputRef={ref => { this.inputRef = ref }} type="text" {...input} />
        </HackAutosizeInput>
      ) : (
        <DisplayName onClick={this.onClick} pointer={pointer}>{value}</DisplayName>
      )
    )
  }
}

Input.propTypes = {
  value: T.string.isRequired,
  pointer: T.bool,
  shouldActivateOnClick: T.bool,
}

Input.defaultProps = {
  shouldActivateOnClick: true,
  pointer: false,
}

// https://github.com/JedWatson/react-input-autosize/issues/135
const ff = window.navigator.userAgent.includes('Firefox')
const standardCorrection = 1.9 // keep this when 135 fixed
const HackAutosizeInput = styled.span`
  div[style] {
    margin-right: ${ff ? `-${15 + standardCorrection}px` : `-${standardCorrection}px`};
  }
`

const DisplayName = styled.span`
  cursor: ${props => props.pointer ? 'pointer' : 'text'};
`
