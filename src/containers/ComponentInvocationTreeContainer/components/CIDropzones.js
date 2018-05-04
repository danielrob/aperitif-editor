import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { indent } from 'utils'

import { CIDropzonesReveal } from './'

const CIDropzones = ({ id, depth, isOverCI, ...props }) => isOverCI ? (
  <React.Fragment>
    {indent(depth + 1)}
    <CIDropzonesReveal parentId={id} position={0} {...props} />
  </React.Fragment>
) : null

export default styled(CIDropzones).as.div`
  display: flex;
`
CIDropzones.propTypes = {
  id: T.number.isRequired,
  isOverCI: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),
}

CIDropzones.defaultProps = {
  dragItem: {},
}
