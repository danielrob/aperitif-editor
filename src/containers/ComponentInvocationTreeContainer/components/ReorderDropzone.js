import styled from 'styled-components'

const ReorderDropzone = styled.div`
  border-left: 1px dotted black;
  padding: 5px 5px;
  min-height: ${props => props.ciDimensions.clientHeight}px;
  min-width: ${props => props.ciDimensions.clientWidth - (props.depth * 20)}px;
  box-sizing: initial;
`

export default ReorderDropzone
