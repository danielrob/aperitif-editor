import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'
import { In } from 'components'
import { capitalize } from 'utils'
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
        <In />
        {`${dragItem.name}={${dragItem.name}}`}<br />
        {'/>'}
      </div>
    </NewWithPropDropzone>
  </React.Fragment>
)

PropDropzonesReveal.propTypes = {
  dragItem: T.shape({
    name: T.string,
  }).isRequired,
}

export default styled(PropDropzonesReveal).as.div`
  color: ${theme.color.grey};
  height: 100%;
  display: flex;
  flex-direction: column;
`

