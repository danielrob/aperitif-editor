import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'
import { In } from 'components'
import { capitalize } from 'utils'
import { SimplePropDropzone } from '../containers'

const DropHover = ({ dragItem }) => (
  <React.Fragment>
    <SimplePropDropzone>
      <div>
        {`{${dragItem.name}}`}
      </div>
    </SimplePropDropzone>
    <SimplePropDropzone>
      <div>
        {'<'}{capitalize(dragItem.name)}{'>'}{'{'}{dragItem.name}{'}'}{'</'}{capitalize(dragItem.name)}{'>'}
      </div>
    </SimplePropDropzone>
    <SimplePropDropzone>
      <div>
        {'<'}{capitalize(dragItem.name)}<br />
        <In />
        {`${dragItem.name}={${dragItem.name}}`}<br />
        {'/>'}
      </div>
    </SimplePropDropzone>
  </React.Fragment>
)

export default styled(DropHover).as.div`
  color: ${theme.color.grey};
  height: 100%;
  display: flex;
  flex-direction: column;
`
