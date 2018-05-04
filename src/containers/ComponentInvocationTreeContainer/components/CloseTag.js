import React from 'react'
import { indent } from 'utils'

const CloseTag = ({ depth, name, shouldDisplay }) => shouldDisplay ? (
  <span>
    {indent(depth)}
    {'<'}/{name}{'>'}
  </span>
) : null

export default CloseTag
