import React from 'react'
import { Line, Keyword } from 'components'
import { indent } from 'utils'

export default class ProjectIndex extends React.Component {
  render() {
    return (
      <div>
        <Line statement>
          <Keyword>import</Keyword> {'{'} render {'}'} <Keyword>from</Keyword> 'react-dom'
        </Line>
        <Line statement>
          <Keyword>import</Keyword> {'{'} AppContainer {'}'} <Keyword>from</Keyword> 'containers'
        </Line>
        <br />
        <Line statement>
          render(<br />
          <Keyword>{indent(1)}{'<AppContainer />'}</Keyword>,<br />
          {indent(1)}document.getElementById('root')<br />
          )
        </Line>
      </div>
    )
  }
}
