import styled from 'styled-components'
import { addClassNames } from 'utils'

const FileExplorerWrapper = styled.div.attrs(addClassNames(
))`
  padding: 50px 40px;
  background-color: ${props => props.theme.colors.washedpink};
  color: ${props => props.theme.colors.darkblue};
`
// font-weight: 300;

export default FileExplorerWrapper
