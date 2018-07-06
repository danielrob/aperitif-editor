import React from 'react'
import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import styled, { css } from 'styled-as-components'
import theme from 'theme-proxy'

const PropDropzone = ({ children }) => <div>{children}</div>

/* propTypes */
PropDropzone.propTypes = forbidExtraProps({
  isOver: T.bool.isRequired,
  children: T.node.isRequired,
  innerRef: T.func.isRequired,
})

/* style, export */
export default styled(PropDropzone).as.div`
  position: relative;
  padding: 0 300px 0 200px;
  margin-left: -200px;
  white-space: pre;
  > * {
    display: inline-block;
    border-radius: 6px;
    border: 1px dotted;
    padding: 10px;
  }
  transition: 70ms ease-in-out;
  font-size: ${props => props.isOver ? '16px' : '2px'};
  backface-visibility: hidden;
  transform: translateZ(0) scale(1.0, 1.0);
  ${props =>
    props.isOver &&
    css`
      color: ${theme.colors.darkgreen};
    `}
`

