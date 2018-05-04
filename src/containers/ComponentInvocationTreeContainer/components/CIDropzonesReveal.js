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

const CIDropzonesReveal = ({ dragItem, ...props }) => (
  <React.Fragment>
    {/* <SimplePropDropzone>
        {`{${dragItem.name}}`}
    </SimplePropDropzone> */}
    <NewWithPropAsChildPropDropzone {...props}>
      {'<'}{capitalize(dragItem.name)}{'>'}{'{'}{dragItem.name}{'}'}{'</'}{capitalize(dragItem.name)}{'>'}
    </NewWithPropAsChildPropDropzone>
    <NewWithPropDropzone {...props}>
      {'<'}{capitalize(dragItem.name)}<br />
      {indent(1)}{`${dragItem.name}={${dragItem.name}}`}<br />
      {'/>'}
    </NewWithPropDropzone>
  </React.Fragment>
)

export default styled(CIDropzonesReveal).as.div`
  display: flex;
  flex-direction: column;
  color: ${theme.color.grey};
`

CIDropzonesReveal.propTypes = {
  dragItem: T.shape({ name: T.string }).isRequired,
}
