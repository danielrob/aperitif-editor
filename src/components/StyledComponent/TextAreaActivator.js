import { debounce } from 'lodash'
import React from 'react'

/*
  Determines whether a text area or pre should be displayed
*/
export default class TextAreaActivator extends React.Component {
  state = {
    over: false,
    lock: false,
  }

  onMouseOver = () => this.setState({ over: true })
  onMouseLeave = debounce(() => {
    if (this.state.over) {
      this.setState({ over: false })
    }
  }, 100)
  onLock = () => this.setState({ lock: true })
  onUnlock = () => this.setState({ lock: false })

  render() {
    const { render } = this.props
    const { over, lock } = this.state

    return (
      <span onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        {render({
          displayTextArea: over || lock,
          onLock: this.onLock,
          onUnlock: this.onUnlock,
        })}
      </span>
    )
  }
}
