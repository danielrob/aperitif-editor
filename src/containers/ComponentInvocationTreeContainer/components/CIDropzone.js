import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import styled from 'styled-components'

const CIDropzone = styled.div`
  padding: 10px;
  margin: 0 2px;
  border: 1px dotted;
  border-radius: 5px;
  font-size: ${props => props.isOver ? '16px' : '14px'};
  transition: font-size 50ms;
  ${props => props.isOver && 'color: #333;'}
`
export default CIDropzone

CIDropzone.propTypes = forbidExtraProps({
  isOver: T.bool.isRequired,
  children: T.node.isRequired,
  innerRef: T.func.isRequired,
})
