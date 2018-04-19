import styled from 'styled-components'
import { addClassNames } from 'utils'

const AppWrapper = styled.div.attrs(addClassNames(
))`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

export default AppWrapper
