import React from 'react'
import { connect } from 'react-redux'
import { toggleComponentType } from 'duck'
import { Keyword } from 'components'

class ComponentTypeToggle extends React.Component {
  onClick = () => {
    const { toggleComponentType, declarationId, targetType } = this.props
    toggleComponentType({ declarationId, targetType })
  }

  render() {
    return (
      <span onClick={this.onClick}>
        <Keyword>{this.props.text}</Keyword>
      </span>
    )
  }
}

const mapDispatchToProps = { toggleComponentType }

export default connect(null, mapDispatchToProps)(ComponentTypeToggle)
