import React from 'react'
import styled from 'styled-as-components'
import C from 'check-types'

import theme from 'theme-proxy'
import { Flex } from 'components'

import apiArrayResponse from './apiArrayResponse.json'
import apiObjectResponse from './apiObjectResponse.json'

let isWelcome = true

class AperitifPost extends React.PureComponent {
  state = {
    textarea: '',
    error: null,
  }
  onChange = e => {
    this.setState({ textarea: e.target.value, error: null })
  }
  populate = () => {
    this.setState({
      textarea: JSON.stringify(
        Math.random() > 0.49 ? apiArrayResponse : apiObjectResponse,
        null,
        2
      ),
    })
  }
  submit = () => {
    const { initializeApp, newContainerPlease, undo } = this.props
    const { textarea } = this.state
    let json
    let error
    // try JSON.parse
    try {
      json = JSON.parse(textarea)
    } catch (e) {
      error = `${e.message}` // JSON.parse error
    }
    // try eval
    try {
      json = JSON.parse(JSON.stringify(eval(`(${textarea})`))) // eslint-disable-line no-eval
    } catch (e) {
      // do nothing. If eval worked then the parsing will work, if not too bad.
    }

    if (json) {
      if (C.object(json) || C.array.of.object(json)) {
        return isWelcome ? initializeApp(json) : undo() && newContainerPlease(json)
      }
      error = 'The response shape must be an array of objects or an object'
    }

    this.setState({ error })
  }

  componentDidMount() {
    // if (process.env.NODE_ENV === 'development' && isWelcome) {
    //   isWelcome = false
    //   this.props.initializeApp(apiArrayResponse)
    // }
  }

  componentWillUnmount() {
    isWelcome = false
  }

  render() {
    const { textarea, error } = this.state

    return (
      <React.Fragment>
        {isWelcome
          ? 'Aperitif uses the response shapes of api endpoints intelligently.'
          : 'What api endpoint data will this container be responsible for?'
        }
        <br />
        <br />
        <Flex aiend>
          <TextArea
            value={textarea}
            name="apiResponseData"
            cols="1000"
            rows="10"
            placeholder="Paste a sample api endpoint response here..."
            onChange={this.onChange}
          />
          <StartAppWrapper>
            Then click <br /> ↓{' '}
            <Button onClick={this.submit}>{isWelcome ? 'Start App' : 'Add Container'}</Button>
          </StartAppWrapper>
        </Flex>
        <Error error={error}>{error}</Error>
        <br />
        Or, <Button onClick={this.populate}>Autofill an example response</Button>
      </React.Fragment>
    )
  }
}

const Error = styled.div`
  margin: 2px;
  min-height: ${theme.lineHeightInPx};
  color: ${theme.color.error};
`

const TextArea = styled.textarea`
  white-space: pre-wrap;
  resize: none;
  border: 1px solid #ccc;
  outline: none;
  padding: 5px;
  &::placeholder {
    color: #010431;
  }
`

const StartAppWrapper = styled.div`
  margin: 0 15px;
  text-align: center;
`

const Button = styled.button`
  white-space: nowrap;
  color: black;
  padding: 6px;
  background-color: #e6e6e6;
  &:hover {
    background-color: #010431;
    border: 3px solid #010431;
    color: #ccc;
  }
  border: 3px solid #e6e6e6;
  border-radius: 5px;
  margin: 4px;
`

export default styled(AperitifPost).as.div`
  padding: 50px 80px;
  max-width: 900px;
`
