import React from 'react'
import { ComponentInvocationTreeContainer } from 'containers'
import Dropzone from './Dropzone'

const InvocationChildren = ({ id, invocationIds, createComponentBundle }) => (
  invocationIds.reduce(
    (out, invocationId, i) => {
      out.push(
        <ComponentInvocationTreeContainer key={invocationId} invocationId={invocationId} />
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
  )
)

export default InvocationChildren
