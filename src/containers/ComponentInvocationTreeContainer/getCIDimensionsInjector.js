import React from 'react'

const getCIDimensionsInjector = Component =>
  class ClientHeightInjector extends React.Component {
    constructor() {
      super()
      this.state = {
        componentSnapshot: {},
      }
      this.componentInvocation = React.createRef()
    }
    componentDidMount() {
      const { clientHeight, clientWidth } = this.componentInvocation.current

      // https://reactjs.org/docs/react-component.html#componentdidmount
      // It can, however, be necessary for cases ... when you need to measure a DOM node
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        componentSnapshot: {
          clientHeight,
          clientWidth,
        },
      })
    }
    componentDidUpdate() {
      if (!this.componentInvocation.current) {
        return
      }
      // hacks gonna be hacks: somehow misses a dimensions update without this
      setTimeout(() => {
        const { clientHeight, clientWidth } = this.componentInvocation.current
        const { componentSnapshot } = this.state
        if (
          componentSnapshot.clientHeight === clientHeight &&
          componentSnapshot.clientWidth === clientWidth
        ) {
          return
        }
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          componentSnapshot: {
            clientHeight,
            clientWidth,
          },
        })
      })
    }
    render() {
      return (
        <Component
          {...this.props}
          componentInvocationRef={this.componentInvocation}
          ciDimensions={this.state.componentSnapshot}
        />
      )
    }
  }

export default getCIDimensionsInjector
