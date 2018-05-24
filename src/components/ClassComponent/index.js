import React from 'react'
import { Keyword, Input, ComponentTypeToggle } from 'components'
import { ComponentInvocationTreeContainer } from 'containers'
import { INLINE, STATELESS_FUNCTION_COMPONENT } from 'constantz'
import { indent } from 'utils'
import styled from 'styled-as-components'

class ClassComponent extends React.Component {
  render() {
    const { declarationId, exportType, nameId, invocations } = this.props

    return (
      <React.Fragment>
        {/* open */}
        {exportType === INLINE && <Keyword>export</Keyword>}{' '}
        <ComponentTypeToggle
          declarationId={declarationId}
          targetType={STATELESS_FUNCTION_COMPONENT}
          text="class "
        />
        <Input nameId={nameId} /> <Keyword> extends </Keyword> React.Component {'{'}
        <br />
        {/* constructor */}
        {indent(1)}state = {'{'}
        <br />
        {indent(2)}data: sampleApiResponse,
        <br />
        {indent(1)}{'}'}
        <br />
        <br />
        {/* componentDidMount */}
        {/* {indent(1)}componentDidMount() = {'{'}
        <br />
        {indent(1)}{'}'}
        <br />
        <br /> */}
        {/* render */}
        {indent(1)}render() {'{'}
        <br />
        {indent(2)}<Keyword>const </Keyword>
        data
        = <Keyword>this</Keyword>.state.data
        <br />
        {indent(2)}<Keyword>return </Keyword> (
        {invocations.map(({ id }) =>
          <ComponentInvocationTreeContainer key={id} invocationId={id} isRoot depth={3} />)
        }
        {indent(2)})<br />
        {indent(1)}{'}'}<br />
        {/* close */}
        {'}'}
      </React.Fragment>
    )
  }
}

export default styled(ClassComponent).as.div`

`
