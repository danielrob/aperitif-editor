import React from 'react'
import { indent } from 'utils'

const CloseTag = ({ depth, name }) => (
  <span>
    {indent(depth)}
    {'<'}/{name}{'>'}
  </span>
)

export default CloseTag
