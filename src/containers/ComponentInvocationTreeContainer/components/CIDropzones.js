import T from 'prop-types'
import C from 'check-types'
import React from 'react'
import styled from 'styled-as-components'
import { singular } from 'pluralize'

import theme from 'theme-proxy'
import { capitalize, indent, oneOf } from 'utils'
import { PROP, PARAM_INVOCATION, DIR, FILE, COMPONENT_INVOCATION } from 'constantz'
import {
  SimplePropDropzone,
  NewWithPropDropzone,
  NewWithPropAsChildPropDropzone,
  AddInvocationFromFileDropzone,
  ReorderDropzoneContainer,
} from '../containers'

const CIDropzones = ({ invocationId, position, dragItem, depth, shouldDisplay }) => {
  const dropZoneProps = { targetInvocationId: invocationId, targetPosition: position }
  const { type, name, dropName, payload } = dragItem || {}

  return shouldDisplay && type ? (
    <React.Fragment>
      {indent(depth + 1)}
      <Zones>
        {/* reordering */}
        {[COMPONENT_INVOCATION].includes(type) && (
          <ReorderDropzoneContainer {...dropZoneProps} {...dragItem} />
        )}
        {[PARAM_INVOCATION].includes(type) && (
          <SimplePropDropzone {...dropZoneProps}>
            {`{${name}}`}
          </SimplePropDropzone>
        )}
        {/* prop options */}
        {[PROP].includes(type) && (
          <React.Fragment>
            {oneOf(C.string, C.number, C.null)(payload) && (
              <SimplePropDropzone {...dropZoneProps} dropActionKey="asParamInvocation">
                {`{${name}}`}
              </SimplePropDropzone>
            )}
            {oneOf(C.string, C.number, C.null)(payload) && (
              <NewWithPropDropzone {...dropZoneProps} >
                {'<'}{capitalize(name)}
                {` ${name}={${name}}`}
                {'/>'}
              </NewWithPropDropzone>
            )}
            {C.object(payload) && (
              <NewWithPropDropzone {...dropZoneProps}>
                {`<${capitalize(name)} ...{${name}} />`}
              </NewWithPropDropzone>
            )}
            {oneOf(C.string, C.number, C.null)(payload) && (
              <NewWithPropAsChildPropDropzone {...dropZoneProps}>
                {'<'}{capitalize(name)}{'>'}<br />
                {indent(1)}{'{'}{name}{'}'}<br />
                {'</'}{capitalize(name)}{'>'}
              </NewWithPropAsChildPropDropzone>
            )}
            {oneOf(C.array.of.object)(payload) && (
              <SimplePropDropzone {...dropZoneProps} dropActionKey="newWithMap">
                {'{'}{name}.map({singular(name)} => (<br />
                {indent(1)}{'<'}{capitalize(singular(name))}{` key={${singular(name)}.id} {...${singular(name)}} />`}<br />
                )){'}'}
              </SimplePropDropzone>
            )}
          </React.Fragment>
        )}
        {/* file */}
        {[DIR, FILE].includes(type) && (
          <AddInvocationFromFileDropzone {...dropZoneProps}>
            {'<'}{dropName}{' />'}
          </AddInvocationFromFileDropzone>
        )}
      </Zones>
    </React.Fragment>
  ) : null
}

export default styled(CIDropzones).as.div`
  display: flex;
  line-height: 1.4;
`

const Zones = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.color.washedDarkGreen};
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
  dragItem: {},
}
