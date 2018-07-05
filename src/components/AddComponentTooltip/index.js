import React from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { pD } from 'utils'

import { FolderIcon, SCIcon } from 'components'
import {
  newComponentBundlePlease,
  newStyledComponentPlease,
} from 'duck'

import ContentWrapper from './ContentWrapper'

const AddComponentTooltip = ({
  newComponentBundlePlease,
  newStyledComponentPlease,
  ...props
}) => (
  <ReactTooltip
    id="addComponent"
    effect="solid"
    delayHide={300}
    place="right"
    type="info"
    getContent={() => (
      <ContentWrapper>
        <SCIcon size="15" onClick={pD(newStyledComponentPlease)} />
        <FolderIcon width="17px" onClick={pD(newComponentBundlePlease)} />
      </ContentWrapper>
    )}
    {...props}
  />
)

const AddComponentTooltipStyled = styled(AddComponentTooltip)`
  pointer-events: auto;
  user-select: none;
  &:hover {
    visibility: visible;
    opacity: 1;
  }
`

const mapDispatchToProps = {
  newComponentBundlePlease,
  newStyledComponentPlease,
}

export default connect(null, mapDispatchToProps)(AddComponentTooltipStyled)
