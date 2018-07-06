import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'


import theme from 'theme-proxy'

import githubIssues from './gh-issues.png'
import trelloCard from './trello-card.png'

// It's called AperitifPost because original idea was to have a Postman like experience here
class AperitifPost extends React.PureComponent {
  render() {
    const {
      projectIsInitalized,
      submit,
      canSubmit,
      populate,
      input,
      meta: { error },
    } = this.props

    const validJsonEntered = canSubmit && !error

    return (
      <React.Fragment>
        <IntroText>
          {projectIsInitalized ? (
            'What api endpoint data will this container be responsible for?'
          ) : (
            <span>
              Welcome to the react app (or feature) starter editor.
              <br />
              <br />
              Aperitif uses the response shapes of api endpoints intelligently.
              <br />
            </span>
          )}
        </IntroText>
        <TextArea
          valid={validJsonEntered}
          name="apiResponseData"
          cols="1000"
          rows="1000"
          placeholder="Paste a sample api endpoint json response here... or click an example endpoint/data shape below." // → ←
          {...input}
        />
        <Error error={error}>{error}</Error>
        {validJsonEntered && (
          <p>
            Great! You're now going to load an editor with drag and drop, and which intelligently understands React.
            <br />
            <br />
            Browse the files, try dragging props onto the existing JSX,
            renaming components, and adding styles. When you're done, download or export
            to StackBlitz to continue editing. For more tips, actions, and tutorials,
            see here.
          </p>
        )}
        <Button
          canSubmit={validJsonEntered}
          onClick={submit}
          text={projectIsInitalized ? 'Add Container' : 'Get Apetizers'}
        />
        <Button
          canSubmit={validJsonEntered}
          onClick={() => input.onChange({ target: '' })}
          text="Back"
        />
        <br />
        <br />
        {!validJsonEntered && (
          <div>
            <Image onClick={populate('github-issues')} src={githubIssues} alt="github issues" />
            <Image onClick={populate('trello-card')} src={trelloCard} alt="trello card" />
          </div>
        )}
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
  color: ${theme.color.error};
`

const IntroText = styled.p`
`

const TextArea = styled.textarea`
  white-space: pre;
  resize:  none;
  border: 1px solid #ccc;
  outline: none;
  padding: 5px;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  max-width: 720px;
  max-height: ${props => props.valid ? 0 : 200}px;
  font-size:  ${props => props.valid ? 0 : 16}px;
  transition: all 600ms ease-in;
  &::placeholder {
    white-space: pre-wrap;
    color: #010431;
    font-style: italic;
    font-size: 16px;
  }
`

const Button = styled.button.attrs({
  children: props => props.text,
})`
  ${props => !props.canSubmit && 'visibility: hidden;'} white-space: nowrap;
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

const Image = styled.img`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: 10px;
`


/*
  styled & export
*/
export default styled(AperitifPost).as.div`
  padding: 50px 80px;
  max-width: 900px;
`
