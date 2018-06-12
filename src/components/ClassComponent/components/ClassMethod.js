import React from 'react'
import { indent } from 'utils'
import { JSX, Keyword, Props, Input } from 'components'
import { DeclarationContainer, ParamsContainer } from 'containers'

export default class ClassMethod extends React.Component {
  render() {
    const { declarationId, declarationIds, invocationIds } = this.props
    return (
      <div>
        {indent(1)}render() {'{'}
        <br />
        {!!declarationIds.length && indent(2)}
        {declarationIds.map(id => (
          <DeclarationContainer key={id} declarationId={id}>
            {({ name, nameId, declParamIds }) => (
              <span>
                <Keyword>const </Keyword>
                {declParamIds.length ? (
                  <span>
                    <ParamsContainer paramIds={declParamIds}>
                      {(params, spreadParams) => (
                        <Props
                          params={params}
                          spreadParams={spreadParams}
                          declarationId={declarationId}
                        />
                      )}
                    </ParamsContainer>
                    <span> = <Keyword>this</Keyword>.props</span>
                  </span>
                ) : (
                  <span>
                    <Input nameId={nameId} />
                    {' '} = <Keyword>this</Keyword>.state.{name}
                  </span>
                )}
                <br />
              </span>
            )}
          </DeclarationContainer>
        ))}
        {indent(2)}
        <Keyword>return </Keyword> (
        {invocationIds.map(id => (
          <JSX key={id} invocationId={id} initial depth={3} />
        ))}
        {indent(2)})<br />
        {indent(1)}
        {'}'}
        <br />
      </div>
    )
  }
}
