import { partition } from 'lodash'
import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { invocationPropTypes } from 'model-prop-types'
import { PROP, PROPS_SPREAD, CALL_PARAM } from 'constantz'
import { indent } from 'utils'
import { JSX } from 'components'
import { Name, NameInput } from 'containers'
import { CallParamDragContainer } from '../containers'

const OpenTag = ({
  isOverOpenTag,
  dragItem,
  depth,
  invocation: {
    invocationId,
    callParams,
    closed,
    hasPropsSpread,
    pseudoSpreadPropsName,
    nameId,
  },
}) => {
  // three types of drop
  const spreadPropsIsOver = isOverOpenTag && dragItem.type === PROPS_SPREAD
  const propIsOver = isOverOpenTag && dragItem.type === PROP &&
    canDropPropToOpenTag(callParams, pseudoSpreadPropsName, dragItem)
  const callParamIsOver = isOverOpenTag && dragItem.type === CALL_PARAM &&
    canDropCallParamToOpenTag(callParams, dragItem)

  const [keyParams, standardCallParams] = partition(callParams, p => p.name === 'key')
  const keyParam = keyParams[0]

  return (
    <React.Fragment>
      {indent(depth)}{'<'}<NameInput nameId={nameId} />
      {/* key= special case */}
      {keyParam && (
        <span>
          {' '}<Name nameId={keyParam.nameId} />={'{'}<JSX invocationId={keyParam.valueInvocationId} depth={0} />{'}'}
        </span>
      )}
      {/* PROPS_SPREAD Dropzone */}
      {(hasPropsSpread || spreadPropsIsOver) && (
        <span className="spread-props-attribute">
          {' {'}...props{'}'}
        </span>
      )}
      {/* spread props */}
      {pseudoSpreadPropsName && (
        <span className="spread-props-attribute">
          {' {'}...{pseudoSpreadPropsName}{'}'}
        </span>
      )}
      {/* PROP Dropzone */}
      {propIsOver && (
        <NewAttributePreview>
          {' '}
          <Name
            nameId={dragItem.nameId}
            render={name => (
              <React.Fragment>
                {name}={'{'}
                {dragItem.isSpreadMember && 'props.'}
                {name}
              </React.Fragment>
            )}
          />
          {'}'}
        </NewAttributePreview>
      )}
      {/* CALL_PARAM Dropzone */}
      {callParamIsOver && (
        <NewAttributePreview>
          {' '}
          <React.Fragment>
            {dragItem.name}={'{'}
            {dragItem.declIsSpreadMember && 'props.'}
            {dragItem.name}
          </React.Fragment>
        </NewAttributePreview>
      )}
      {/* normal call params */}
      {standardCallParams.map(callParam => (
        <CallParamDragContainer
          callParam={callParam}
          spreadPropsIsOverTag={spreadPropsIsOver}
          tagHasPropsSpread={hasPropsSpread}
          invocationId={invocationId}
        />
      ))}
      {closed && ' /'}
      {'>'}
    </React.Fragment>
  )
}

/*
  propTypes
*/
OpenTag.propTypes = forbidExtraProps({
  invocation: invocationPropTypes.isRequired,
  depth: T.number.isRequired,
  // for wrapper
  innerRef: T.func.isRequired,
  // Injected by React DnD:
  isOverOpenTag: T.bool.isRequired,
  dragItem: T.shape({ type: T.string }).isRequired,
})

const NewAttributePreview = styled.span`
  color: ${theme.color.darkgreen};
  transition: 250ms;
`

/*
  style, export
*/
export default styled(OpenTag).as.div`
  ${props => props.invocation.inline && 'display: inline-block;'}
`

// helpers
export const canDropPropToOpenTag = (targetCallParams, pseudoSpreadPropsName, propBeingDragged) =>
  !targetCallParams.find(({ declParamId }) => declParamId === propBeingDragged.paramId)
  && pseudoSpreadPropsName !== propBeingDragged.name

export const canDropCallParamToOpenTag = (targetCallParams, callParamBeingDragged) =>
  !targetCallParams.find(({ name }) => name === callParamBeingDragged.name)
