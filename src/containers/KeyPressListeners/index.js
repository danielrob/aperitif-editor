import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

class KeyPressListeners extends React.Component {
  keydown = event => {
    if (event.keyCode === 27) {
      document.activeElement.blur()
    }
    if (event.keyCode === 90 && (event.ctrlKey || event.metaKey)) {
      if (event.shiftKey) {
        this.props.redo()
      } else {
        this.props.undo()
      }
      event.preventDefault()
    }
    if (event.keyCode === 89 && (event.ctrlKey || event.metaKey)) {
      this.props.redo()
      event.preventDefault()
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keydown, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown, false)
  }
  render() {
    return null
  }
}

const { undo, redo } = UndoActionCreators

const mapDispatchToProps = {
  undo,
  redo,
}

/* compose export */
export default connect(
  null,
  mapDispatchToProps
)(KeyPressListeners)
