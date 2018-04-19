import styled from 'styled-components'
import { addClassNames } from 'utils'

const FileExplorerWrapper = styled.div.attrs(addClassNames(
))`
  padding: 50px 30px;
  border-right: 2px solid black;
  background-color: #1e1e1e;
  color: #fffccf;
`
// font-weight: 300;

export default FileExplorerWrapper
