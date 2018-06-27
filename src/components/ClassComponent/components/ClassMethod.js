import T from 'prop-types'
import React from 'react'

import { indent } from 'utils'
import { JSX, Keyword, Semi } from 'components'
import { DeclarationContainer, NameInput, PropsContainer } from 'containers'
import { declarationPropTypes } from 'model-prop-types'

export default class ClassMethod extends React.PureComponent {
  render() {
    const {
      declaration: {
        declarationId,
        declarationIds,
        invocationIds,
      },
      thiz: {
        declParamIds,
      },
    } = this.props
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
                {declParamIds.length ? (
                  <span>
                    <PropsContainer
                      declParamIds={declParamIds}
                      declarationId={declarationId}
                      depth={3}
                    />
                    <span>
                      {' '}
                      = <Keyword>this</Keyword>.props
                    </span>
                  </span>
                ) : (
                  <span>
                    {'{ '}
                    <NameInput nameId={nameId} />
                    {' } '}
                    = <Keyword>this</Keyword>.state<Semi />
                  </span>
                )}
                <br />
              </span>
            )}
          />
        ))}
        {indent(2)}
        <Keyword>return </Keyword> (
        {invocationIds.map(id => <JSX key={id} invocationId={id} initial depth={3} />)}
        {indent(2)})<Semi />
        {indent(1)}
        {'}'}
        <br />
      </div>
    )
  }
}

ClassMethod.propTypes = {
  thiz: T.shape({ props: T.array }).isRequired,
  declaration: declarationPropTypes.isRequired,
}
