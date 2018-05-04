import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'
import { capitalize, indent } from 'utils'
import {
  // SimplePropDropzone,
  NewWithPropDropzone,
  NewWithPropAsChildPropDropzone,
} from '../containers'

const PropDropzonesReveal = ({ dragItem, ...props }) => (
  <React.Fragment>
    {/* <SimplePropDropzone>
      <div>
        {`{${dragItem.name}}`}
      </div>
    </SimplePropDropzone> */}
    <NewWithPropAsChildPropDropzone {...props}>
      <div>
        {'<'}{capitalize(dragItem.name)}{'>'}{'{'}{dragItem.name}{'}'}{'</'}{capitalize(dragItem.name)}{'>'}
      </div>
    </NewWithPropAsChildPropDropzone>
    <NewWithPropDropzone {...props}>
      <div>
        {'<'}{capitalize(dragItem.name)}<br />
        {indent(1)}{`${dragItem.name}={${dragItem.name}}`}<br />
        {'/>'}
      </div>
    </NewWithPropDropzone>
  </React.Fragment>
)

export default styled(PropDropzonesReveal).as.div`
  color: ${theme.color.grey};
  height: 100%;
  display: flex;
  flex-direction: column;
`

PropDropzonesReveal.propTypes = {
  dragItem: T.shape({ name: T.string }).isRequired,
}
