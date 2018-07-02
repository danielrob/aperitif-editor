import React from 'react'

export default class TextAreaActivator extends React.Component {
  state = {
    over: false,
    lock: false,
  }

  onMouseOver = () => this.setState({ over: true })
  onMouseLeave = () => this.setState({ over: false })
  onLock = () => this.setState({ lock: true })
  onUnlock = () => this.setState({ lock: false })

  render() {
    const { render } = this.props

    return (
      <span onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        {render({
          ...this.state,
          onLock: this.onLock,
          onUnlock: this.onUnlock,
        })}
      </span>
    )
  }
}
