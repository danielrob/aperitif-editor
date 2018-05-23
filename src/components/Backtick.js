import styled from 'styled-as-components'
import theme from 'theme-proxy'

const Backtick = styled.span.attrs({
  children: '`',
})`
  color: ${theme.colors.orange};
`

export default Backtick
