import React from 'react'
import { connect } from 'react-redux'
import { changeName } from 'duck'
import { createStructuredSelector } from 'reselect'
import { makeSelectName } from 'selectors'
import AutosizeInput from 'react-input-autosize'

class Input extends React.Component {
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

  render() {
    const { name } = this.props
    const input = {
      value: name,
      onChange: this.onChange,
    }

    return (
      <AutosizeInput inputRef={ref => { this.inputRef = ref }} type="text" {...input} />
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
