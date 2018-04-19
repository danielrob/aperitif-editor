import styled from 'styled-components'

const WorkspaceWrapper = styled.div`
    & > div {
      position: absolute;
      bottom: 0;
    }
    & > div:first-child {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: ${props => props.explorerWidth}px;
    }
    & > div:last-child {
      top: 0;
      left: ${props => props.explorerWidth}px;
      right: 0;
   }
`

export default WorkspaceWrapper
