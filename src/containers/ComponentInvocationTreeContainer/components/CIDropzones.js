import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { capitalize, indent } from 'utils'
import { PARAM_INVOCATION } from 'constantz'
import {
  SimplePropDropzone,
  NewWithPropDropzone,
  NewWithPropAsChildPropDropzone,
  AddInvocationFromFileDropzone,
  ReorderDropzoneContainer,
} from '../containers'

const CIDropzones = ({ invocationId, position, dragItem, depth, shouldDisplay }) => {
  const dropZoneProps = { targetInvocationId: invocationId, targetPosition: position }

  return shouldDisplay && dragItem ? (
    <React.Fragment>
      {indent(depth + 1)}
      <div className="zones">
        {(dragItem.isLast !== undefined || dragItem.type === PARAM_INVOCATION) && (
          <SimplePropDropzone {...dropZoneProps}>
            {`{${dragItem.name}}`}
          </SimplePropDropzone>
        )}
        {dragItem.isLast !== undefined && (
          <NewWithPropDropzone {...dropZoneProps} >
            {'<'}{capitalize(dragItem.name)}
            {` ${dragItem.name}={${dragItem.name}}`}
            {'/>'}
          </NewWithPropDropzone>
        )}
        {dragItem.isLast !== undefined && (
          <NewWithPropAsChildPropDropzone {...dropZoneProps}>
            {'<'}{capitalize(dragItem.name)}{'>'}<br />
            {indent(1)}{'{'}{dragItem.name}{'}'}<br />
            {'</'}{capitalize(dragItem.name)}{'>'}
          </NewWithPropAsChildPropDropzone>
        )}
        {dragItem.fileId !== undefined && (
          <AddInvocationFromFileDropzone {...dropZoneProps}>
            {'<'}{dragItem.dropName}{' />'}
          </AddInvocationFromFileDropzone>
        )}
        {dragItem.ciDimensions && (
          <ReorderDropzoneContainer {...dropZoneProps} {...dragItem} />
        )}
      </div>
    </React.Fragment>
  ) : null
}

export default styled(CIDropzones).as.div`
  display: flex;
  line-height: 1.4;
  .zones {
    display: flex;
    flex-direction: column;
    color: ${theme.color.washedDarkGreen};
  }
`

/* propTypes */
CIDropzones.propTypes = {
  invocationId: T.number.isRequired,
  shouldDisplay: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),
  depth: T.number.isRequired,
  position: T.number.isRequired,
  // ...props - see ComponentInvocationTree
}

CIDropzones.defaultProps = {
  dragItem: null,
}
