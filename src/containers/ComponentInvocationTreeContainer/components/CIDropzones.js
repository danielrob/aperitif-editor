import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { capitalize, indent } from 'utils'
import {
  // SimplePropDropzone,
  NewWithPropDropzone,
  NewWithPropAsChildPropDropzone,
  AddInvocationFromFileDropzone,
} from '../containers'

const CIDropzones = ({ dragItem, depth, shouldDisplay, ...props }) => shouldDisplay && dragItem ? (
  <React.Fragment>
    {indent(depth + 1)}
    <div className="zones">
      {/* <SimplePropDropzone>
          {`{${dragItem.name}}`}
      </SimplePropDropzone> */}
      {dragItem.isLast !== undefined && (
        <React.Fragment>
          <NewWithPropAsChildPropDropzone {...props}>
            {'<'}{capitalize(dragItem.name)}{'>'}{'{'}{dragItem.name}{'}'}{'</'}{capitalize(dragItem.name)}{'>'}
          </NewWithPropAsChildPropDropzone>
          <NewWithPropDropzone {...props}>
            {'<'}{capitalize(dragItem.name)}<br />
            {indent(1)}{`${dragItem.name}={${dragItem.name}}`}<br />
            {'/>'}
          </NewWithPropDropzone>
        </React.Fragment>
      )}
      {dragItem.fileId !== undefined && (
        <React.Fragment>
          <AddInvocationFromFileDropzone {...props}>
            {'<'}{dragItem.dropName}{' />'}
          </AddInvocationFromFileDropzone>
        </React.Fragment>
      )}
    </div>
  </React.Fragment>
) : null

export default styled(CIDropzones).as.div`
  display: flex;
  .zones {
    display: flex;
    flex-direction: column;
    color: ${theme.color.grey};
  }
`

CIDropzones.propTypes = {
  id: T.number.isRequired,
  shouldDisplay: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),
}

CIDropzones.defaultProps = {
  dragItem: {},
}
