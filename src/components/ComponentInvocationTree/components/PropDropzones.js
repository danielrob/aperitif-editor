import React from 'react'
import styled from 'styled-as-components'

import { Line } from 'components'
import { PropDropzonesReveal } from './'

const PropDropzones = ({ dragItem, isOver }) => (
  <React.Fragment>
    {isOver && <PropDropzonesReveal dragItem={dragItem} />}
    {/* <PropDropzonesReveal dragItem={dragItem || { name: 'asdads' }} /> */}
    {/* <Line in4>
      <span>[+]</span> new component
    </Line> */}
  </React.Fragment>
)

export default styled(PropDropzones).as.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px 0;
  margin: -20px 0;
  width: 100%;
  & > .line {
    display: none;
  }
  &:hover > .line {
    display: block;
  }
`
