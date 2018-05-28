import React from 'react'
import { connect } from 'react-redux'
import { convertToClassCompmonent, convertToStatelessFunctionComponent } from 'duck'
import { Keyword } from 'components'
import { STATELESS_FUNCTION_COMPONENT, CLASS_COMPONENT } from 'constantz'

const toggleMap = {
  [STATELESS_FUNCTION_COMPONENT]: 'convertToStatelessFunctionComponent',
  [CLASS_COMPONENT]: 'convertToClassCompmonent',
}

class ComponentTypeToggle extends React.Component {
  onClick = () => {
    const { declarationId, targetType, ...props } = this.props
    props[toggleMap[targetType]]({ declarationId })
  }

  render() {
    return (
      <span onClick={this.onClick}>
        <Keyword>{this.props.text}</Keyword>
      </span>
    )
  }
}

const mapDispatchToProps = {
  convertToClassCompmonent,
  convertToStatelessFunctionComponent,
}

export default connect(null, mapDispatchToProps)(ComponentTypeToggle)
