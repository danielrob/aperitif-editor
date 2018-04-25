import React from 'react'
import { ComponentInvocationTreeContainer } from 'containers'
import { PropDropzonesContainer } from '../containers'

const InvocationChildren = ({ id, invocationIds, createComponentBundle }) => (
  invocationIds.reduce(
    (out, invocationId, i) => {
      out.push(
        <ComponentInvocationTreeContainer key={invocationId} invocationId={invocationId} />
      )
      out.push(
        <PropDropzonesContainer
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
      <PropDropzonesContainer
        key="first"
        onClickAction={createComponentBundle}
        onDropAction={() => undefined}
        parentId={id}
        position={0}
      />,
    ]
  )
)

export default InvocationChildren
