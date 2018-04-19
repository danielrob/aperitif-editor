import styled from 'styled-components'
import { addClassNames } from 'utils'

const HeaderWrapper = styled.div.attrs(addClassNames(
  'bg-green'
))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: 1;
  opacity: 0.1;
`

export default HeaderWrapper
