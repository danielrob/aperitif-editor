  import styled from 'styled-components'
import { addClassNames } from 'utils'

const EditorWindow = styled.div.attrs(addClassNames(
))`
  background-color: #fff;
  padding: 50px 100px;
  color: #010431;
  >* {
    margin-bottom: 12px;
  }
`

export default EditorWindow
