import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-as-components'
import { bindActionCreators } from 'redux'

import { Dropzone } from 'components'
import { createComponentBundle } from 'containers/App/duck'

import { makeGetInvocation } from './selectors'

const ComponentS = styled.div`
  color: ${props => props.theme.colors.darkgreen};
  margin-left: 12px;
`

class ComponentInvocation extends React.Component {
  render() {
    const { id, name, invocationIds, className, createComponentBundle } = this.props
    return (
      <ComponentS className={className}>
        {`<${name}>`}
        {invocationIds.reduce(
          (out, invocationId, i) => {
            out.push(
              <ConnectedComponentInvocation key={invocationId} invocationId={invocationId} />
            )
            out.push(
              <Dropzone
                key={`invocation-${invocationId}-drop`}
                onClickAction={createComponentBundle}
                onDropAction={() => undefined}
                parentId={id}
                position={i + 1}
              />
            )
            return out
          },
          [
            <Dropzone
              key="first"
              onClickAction={createComponentBundle}
              onDropAction={() => undefined}
              parentId={id}
              position={0}
            />,
          ]
        )}
        {`</${name}>`}
      </ComponentS>
    )
  }
}

const makeMapStateToProps = () => {
  const getInvocation = makeGetInvocation()
  return (state, props) => getInvocation(state, props)
}


const mapDispatchToProps = dispatch => bindActionCreators({
  createComponentBundle,
}, dispatch)

const ConnectedComponentInvocation = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ComponentInvocation)

const ComponentWrapper = styled(ConnectedComponentInvocation)``

export default ComponentWrapper
