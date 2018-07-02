import styled from 'styled-components'
import theme from 'theme-proxy'

// ff text selection adds newlines around pre elements
const Pre = styled.div`
  white-space: pre;
  margin: 0;
  padding: 5px 0 5px 0;
  color: ${theme.colors.orange};
`

export default Pre
