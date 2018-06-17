import React from 'react'
import { Line, Keyword, Input } from 'components'
import { indent } from 'utils'
import { APP_CONTAINER_NAME_ID } from 'duck/initializeFromData'

export default class ProjectIndex extends React.PureComponent {
  render() {
    return (
      <div>
        <Line statement>
          <Keyword>import</Keyword> React <Keyword>from</Keyword> 'react'
        </Line>
        <Line statement>
          <Keyword>import</Keyword> ReactDOM <Keyword>from</Keyword> 'react-dom'
        </Line>
        <Line statement>
          <Keyword>import</Keyword>
          {' { '}
          <Input nameId={APP_CONTAINER_NAME_ID} />
          {' } '}
          <Keyword>from</Keyword>
          {' '}
          'containers'
        </Line>
        <br />
        <Line statement>
          ReactDOM.render(<br />
          <Keyword>{indent(1)}{'<'}<Input nameId={APP_CONTAINER_NAME_ID} />{'/>'}</Keyword>,<br />
          {indent(1)}document.getElementById('root')<br />
          )
        </Line>
      </div>
    )
  }
}
