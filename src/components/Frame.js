import ReactDOM from 'react-dom'
import React from 'react'
import { StyleSheetManager } from 'styled-components'

export default class Frame extends React.Component {
  iframe = document.getElementById('frame')
  render() {
    const { iframe, props: { children } } = this

    return (
      <StyleSheetManager target={iframe.contentDocument.head}>
        <div>
          {ReactDOM.createPortal(children, iframe.contentDocument.body)}
        </div>
      </StyleSheetManager>
    )
  }
}
