  import styled from 'styled-components'
import { addClassNames } from 'utils'

const EditorWindow = styled.div.attrs(addClassNames(
))`
  background-color: ${props => props.theme.colors.white};
  padding: 50px 100px;
  color: ${props => props.theme.colors.darkblue};
  >* {
    margin-bottom: 12px;
  }
`

export default EditorWindow
