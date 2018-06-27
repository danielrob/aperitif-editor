import React from 'react'

import { indent } from 'utils'
import { JSX } from 'components'
import { DeclarationContainer, NameInput } from 'containers'

const ObjectLiteral = ({ declarationIds, invocationIds, depth = 1, inline }) => (
  <React.Fragment>
    {'{'}
    {inline ? ' ' : <br />}
    {declarationIds.map((did, index) => (
      <DeclarationContainer
        key={did}
        declarationId={did}
        render={({ nameId }) => (
          <span>
            {!inline && indent(depth + 1)}
            <NameInput nameId={nameId} />
            {': '}
            <JSX invocationId={invocationIds[index]} depth={0} />
            {!inline && (index === declarationIds.length - 1) && ','}
            {!inline && <br />}
          </span>
        )}
      />
    ))}
    {inline ? ' ' : indent(depth)}
    {'}'}
  </React.Fragment>
)

export default ObjectLiteral
