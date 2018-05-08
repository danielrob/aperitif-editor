import React from 'react'
import { connect } from 'react-redux'
import { changeName } from 'duck'
import { createStructuredSelector } from 'reselect'
import { makeSelectName } from 'selectors'
import AutosizeInput from 'react-input-autosize'


class Input extends React.Component {
  onChange = (e) => {
    const { changeName, nameId } = this.props
    changeName({
      nameId,
      value: e.target.value,
    })
  }
  render() {
    const input = {
      value: this.props.name,
      onChange: this.onChange,
    }

    return (<AutosizeInput type="text" {...input} />)
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
