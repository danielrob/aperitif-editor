import { trim } from 'lodash'
import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectProjectInitialized } from 'selectors'
import { initializeApp, newContainerPlease } from 'duck'

import exampleData from './examples'
import getJSON from './getJSON'
import AperitifPost from './AperitifPost'

class AperitifPostContainer extends React.PureComponent {
  state = {
    textarea: '',
    error: null,
  }

  onChange = e => {
    const textarea = trim(e.target.value)
    const { error } = getJSON(textarea)

    this.setState({ textarea, error: (textarea && error) || null })
  }

  onFocus = () => {
    this.setState({ error: null })
  }

  populate = (key, baseName) => () => {
    this.setState({
      textarea: JSON.stringify(exampleData[key], null, 2),
      baseName,
    })
  }

  submit = () => {
    const { initializeApp, newContainerPlease, projectIsInitalized } = this.props
    const { textarea } = this.state
    let { baseName } = this.state
    const { error, json } = getJSON(textarea)

    if (document.getElementById('baseName') && !baseName) {
      baseName = document.getElementById('baseName').value
    }

    if (error) {
      return this.setState({ error })
    }

    if (projectIsInitalized) {
      newContainerPlease(json, baseName)
    } else {
      initializeApp(json, baseName)
    }
  }

  render() {
    const { projectIsInitalized } = this.props
    const { error, textarea } = this.state

    return (
      <AperitifPost
        projectIsInitalized={projectIsInitalized}
        submit={this.submit}
        populate={this.populate}
        canSubmit={!!textarea}
        input={{
          onChange: this.onChange,
          onFocus: this.onFocus,
          value: textarea,
        }}
        meta={{
          error,
        }}
      />
    )
  }
}


/*
  propTypes
*/
AperitifPostContainer.propTypes = forbidExtraProps({
  projectIsInitalized: T.bool.isRequired,
  initializeApp: T.func.isRequired,
  newContainerPlease: T.func.isRequired,
})


/*
  connect
*/
const mapStateToProps = createStructuredSelector({
  projectIsInitalized: selectProjectInitialized,
})

const mapDispatchToProps = {
  initializeApp,
  newContainerPlease,
}

export default connect(mapStateToProps, mapDispatchToProps)(AperitifPostContainer)
