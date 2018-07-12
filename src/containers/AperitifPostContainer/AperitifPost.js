import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'
import ReactTooltip from 'react-tooltip'


import theme from 'theme-proxy'
import { Logo } from 'components'

import githubIssues from './gh-issues.png'
import twitter from './twitter.png'
import nothingtodo from './nothingtodo.png'

// It's called AperitifPost because original idea was to have a Postman like experience here
class AperitifPost extends React.PureComponent {
  componentDidUpdate() {
    ReactTooltip.hide()
    ReactTooltip.show()
  }

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
              <br />
              <Logo />
              Welcome to the React app (or feature) starter editor.
              <br />
              <br />
              Aperitif uses sample API data to help create React code.
              <br />
            </span>
          )}
        </IntroText>
        <TextArea
          valid={validJsonEntered}
          name="apiResponseData"
          cols="1000"
          rows="1000"
          placeholder="Paste an APIs JSON response here... or click an example response below to try it out." // → ←
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
            to StackBlitz to continue editing.
            <br />
            <br />
          </p>
        )}
        <Button
          canSubmit={validJsonEntered}
          onClick={submit}
          text={projectIsInitalized ? 'Add Container' : 'Get Appetizers'}
        />
        <Button
          canSubmit={validJsonEntered}
          onClick={() => input.onChange({ target: '' })}
          text="Back"
        />
        {!validJsonEntered && (
          <Examples>
            <em>Samples:</em>
            <br />
            <Image
              onClick={populate('github-issues', 'GithubIssues')}
              src={githubIssues}
              alt="github issues"
              data-tip="(Re)create a user interface for a list of github issues"
              data-for="sample-description"
            />
            <Image
              onClick={populate('twitter', 'Tweets')}
              src={twitter}
              alt="twitter tweets"
              data-tip="(Re)create a user interface for a list of tweets"
              data-for="sample-description"
            />
            <Image
              onClick={populate('nothingtodo', 'NothingToDoLists')}
              src={nothingtodo}
              alt="nothing to do app"
              data-tip="Lists of relaxing thoughts, and things you don't have to do"
              data-for="sample-description"
            />
          </Examples>
        )}
        <ReactTooltip
          id="sample-description"
          effect="solid"
          showDelay={100}
          getContent={dataTip => <pre>{dataTip}</pre>}
        />
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
  ${props => !props.canSubmit && 'display: none;'}
  white-space: nowrap;
  color: black;
  padding: 6px;
  background-color: #e6e6e6;
  border: 3px solid #e6e6e6;
  border-radius: 5px;
  margin: 4px;
  &:hover {
    background-color: #010431;
    border: 3px solid #010431;
    color: #ccc;
  }
`

const Image = styled.img`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: 10px;
`

const Examples = styled.div`
  margin-top: 15px;
`


/*
  styled & export
*/
export default styled(AperitifPost).as.div`
  padding: 50px 80px;
  max-width: 900px;
`
