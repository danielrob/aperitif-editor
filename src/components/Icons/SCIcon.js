import styled from 'styled-components'

const SCIcon = styled.span.attrs({
  children: '💅',
})`
  display: inline-block;
  font-size: ${props => props.size || 12}px;
  margin: 0 3px 0 4px;
  line-height: 1;
`

export default SCIcon
