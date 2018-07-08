import { isEmpty } from 'lodash'
import T from 'prop-types'
import C from 'check-types'
import React from 'react'
import styled from 'styled-as-components'
import { singular } from 'pluralize'

import theme from 'theme-proxy'
import { camelCase, pascalCase, indent, oneOf, isUrl } from 'utils'
import { Name } from 'containers'
import { PROP, PARAM_INVOCATION, DIR, FILE, COMPONENT_INVOCATION } from 'constantz'
import {
  PropDropzoneContainer,
  AddInvocationFromFileDropzone,
  ReorderDropzoneContainer,
} from '../containers'

const CIDropzones = ({ invocationId, position, dragItem, depth, shouldDisplay }) => {
  const dropZoneProps = { targetInvocationId: invocationId, targetPosition: position }
  const { type, nameId, dropName, payload } = dragItem || {}

  return shouldDisplay && !isEmpty(dragItem) ?
    <Name
      nameId={nameId}
      render={name => (
        <React.Fragment>
          {indent(depth + 1)}
          <Zones>
            {/* reordering */}
            {[COMPONENT_INVOCATION].includes(type) && (
              <ReorderDropzoneContainer {...dropZoneProps} {...dragItem} />
            )}
            {[PARAM_INVOCATION].includes(type) && (
              <PropDropzoneContainer {...dropZoneProps}>
                {`{${name}}`}
              </PropDropzoneContainer>
            )}
            {/* prop options */}
            {[PROP].includes(type) && (
              <React.Fragment>
                {
                //  <styled.span>{item}</styled.span>
                }
                {oneOf(C.string, C.number, C.null)(payload) && !isUrl(payload) && (
                  <PropDropzoneContainer {...dropZoneProps} dropActionKey="newStyled">
                    {'<styled.span>'}{'{'}{name}{'}'}{'</styled.span>'}
                  </PropDropzoneContainer>
                )}
                {
                //  <styled.a href={item} />
                }
                {C.string(payload) && isUrl(payload) && (
                  <PropDropzoneContainer {...dropZoneProps} dropActionKey="newStyledUrl">
                    {`<styled.a href={${name}} />`}
                  </PropDropzoneContainer>
                )}
                {
                // <Item item={item} />
                }
                {oneOf(C.string, C.number, C.null, C.array.of.object)(payload) && (
                  <PropDropzoneContainer {...dropZoneProps} dropActionKey="newWithAttribute">
                    {'<'}{pascalCase(name)}
                    {` ${camelCase(name)}={${name}}`}
                    {'/>'}
                  </PropDropzoneContainer>
                )}
                {
                // {name}
                }
                {oneOf(C.string, C.number, C.null)(payload) && (
                  <PropDropzoneContainer {...dropZoneProps} dropActionKey="asParamInvocation">
                    {`{${name}}`}
                  </PropDropzoneContainer>
                )}
                {
                // <Item {...item} />
                }
                {C.object(payload) && (
                  <PropDropzoneContainer {...dropZoneProps} dropActionKey="newWithSpread">
                    {`<${pascalCase(name)} ...{${name}} />`}
                  </PropDropzoneContainer>
                )}
                {/*
                   <Item>
                    {item}
                   </Item>
                */}
                {oneOf(C.string, C.number, C.null)(payload) && (
                  <PropDropzoneContainer {...dropZoneProps} dropActionKey="newWithChild">
                    {'<'}{pascalCase(name)}{'>'}<br />
                    {indent(1)}{'{'}{name}{'}'}<br />
                    {'</'}{pascalCase(name)}{'>'}
                  </PropDropzoneContainer>
                )}
                {/*
                  {items.map(item => (
                    <Item key={item.id} {...item} />
                  ))}
                */}
                {oneOf(C.array.of.object)(payload) && (
                  <PropDropzoneContainer {...dropZoneProps} dropActionKey="newWithMap">
                    {'{'}{name}.map({singular(name)} => (<br />
                    {indent(1)}
                    {'<'}{pascalCase(singular(name))}
                    {` key={${singular(name)}.id} {...${singular(name)}} />`}
                    <br />
                    )){'}'}
                  </PropDropzoneContainer>
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
      )}
    /> : null
}


/* propTypes */
CIDropzones.propTypes = {
  invocationId: T.number.isRequired,
  shouldDisplay: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),
  depth: T.number.isRequired,
  position: T.number.isRequired,
}

CIDropzones.defaultProps = {
  dragItem: {},
}


/* Zones */
const Zones = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.color.washedDarkGreen};
`


/* style, export */
export default styled(CIDropzones).as.div`
  display: ${props => props.shouldDisplay ? 'flex' : 'none'};
  line-height: 1.4;
`
