import styled from 'styled-as-components'
import { SEMIS } from 'constantz'

const Line = styled.div.attrs({
  className: 'line',
})`
  padding-left: ${props => Number(
    (Object.keys(props).find(key => key.includes('in')) || '').replace('in', '')
  ) * 6}px;
  ${props => props.statement && SEMIS && `
    &:after {
      content: ';';
    }
  `}
`
export default Line
