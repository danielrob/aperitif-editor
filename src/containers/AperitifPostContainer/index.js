import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectProjectInitialized } from 'selectors'
import { initializeApp, newContainerPlease } from 'duck'

import getJSON from './getJSON'
import apiArrayResponse from './apiArrayResponse.json'
import AperitifPost from './AperitifPost'

class AperitifPostContainer extends React.PureComponent {
  state = {
    textarea: '',
    error: null,
  }

  onChange = e => {
    this.setState({ textarea: e.target.value, error: null })
  }

  populate = () => {
    this.setState({
      textarea: JSON.stringify(apiArrayResponse, null, 2),
    })
  }

  submit = () => {
    const { initializeApp, newContainerPlease, projectIsInitalized } = this.props
    const { textarea } = this.state
    const { error, json } = getJSON(textarea)

    if (error) {
      return this.setState({ error })
    }

    if (projectIsInitalized) {
      newContainerPlease(json)
    } else {
      initializeApp(json)
    }
  }

  render() {
    const { projectIsInitalized } = this.state
    const { error, textarea } = this.state

    return (
      <AperitifPost
        projectIsInitalized={projectIsInitalized}
        submit={this.submit}
        populate={this.populate}
        input={{
          onChange: this.onChange,
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
