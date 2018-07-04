import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { Flex } from 'components'

class AperitifPost extends React.PureComponent {
  render() {
    const { projectIsInitalized, submit, populate, input, meta: { error } } = this.props

    return (
      <React.Fragment>
        {projectIsInitalized
          ? 'What api endpoint data will this container be responsible for?'
          : 'Aperitif uses the response shapes of api endpoints intelligently.'
        }
        <br />
        <br />
        <Flex aiend>
          <TextArea
            name="apiResponseData"
            cols="1000"
            rows="10"
            placeholder="Paste a sample api endpoint response here..."
            {...input}
          />
          <StartAppWrapper>
            Then click <br /> ↓{' '}
            <Button onClick={submit}>{projectIsInitalized ? 'Add Container' : 'Start App'}</Button>
          </StartAppWrapper>
        </Flex>
        <Error error={error}>{error}</Error>
        <br />
        Or, <Button onClick={populate}>Autofill an example response</Button>
      </React.Fragment>
    )
  }
}


/*
  propTypes
*/
AperitifPost.propTypes = forbidExtraProps({
  projectIsInitalized: T.bool.isRequired,
  submit: T.func.isRequired,
  populate: T.func.isRequired,
  input: T.shape({
    onChange: T.func.isRequired,
    value: T.string.isRequired,
  }).isRequired,
  meta: T.shape({
    error: T.string,
  }).isRequired,
})


/*
  Components
*/
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


/*
  styled & export
*/
export default styled(AperitifPost).as.div`
  padding: 50px 80px;
  max-width: 900px;
`
