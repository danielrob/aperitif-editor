import styled from 'styled-as-components'
import theme from 'theme-proxy'

const Keyword = styled.span`
  user-select: auto;
  color: ${theme.colors.darkgreen};
  ${props => props.pointer && 'cursor: pointer;'}
`

export default Keyword
