import React from 'react'
import { indent } from 'utils'

const CloseTag = ({ depth, inline, name, shouldDisplay }) => shouldDisplay ? (
  <span>
    {!inline && indent(depth)}
    {'<'}/{name}{'>'}
  </span>
) : null

export default CloseTag
