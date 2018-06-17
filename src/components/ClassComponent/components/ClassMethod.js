import React from 'react'
import { partition } from 'lodash'
import { indent } from 'utils'
import { JSX, Keyword, Props, Input } from 'components'
import { DeclarationContainer } from 'containers'

export default class ClassMethod extends React.PureComponent {
  render() {
    const { declarationId, declarationIds, invocationIds, thiz: { props } } = this.props
    const [spreadProps, nonSpreadProps] = partition(props, p => p.isSpreadMember)
    return (
      <div>
        {indent(1)}render() {'{'}
        <br />
        {!!declarationIds.length && indent(2)}
        {declarationIds.map(id => (
          <DeclarationContainer
            key={id}
            declarationId={id}
            render={({ nameId }) => (
              <span>
                <Keyword>const </Keyword>
                {props.length ? (
                  <span>
                    <Props
                      params={nonSpreadProps}
                      spreadParams={spreadProps}
                      declarationId={declarationId}
                      depth={3}
                    />
                    <span> = <Keyword>this</Keyword>.props</span>
                  </span>
                ) : (
                  <span>
                    {'{ '}<Input nameId={nameId} />{' } '}
                     = <Keyword>this</Keyword>.state
                  </span>
                )}
                <br />
              </span>
            )}
          />
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
