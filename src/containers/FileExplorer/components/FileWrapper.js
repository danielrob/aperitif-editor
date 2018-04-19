import styled from 'styled-components'

const FileWrapper = styled.div`
  ${props => !props.initial && 'margin-left: 10px;'}
  ${props => props.isDirectory && 'padding: 5px 0;'}
`

export default FileWrapper
