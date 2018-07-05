import styled from 'styled-components'

const ContentWrapper = styled.div`
  > * {
    cursor: pointer;
    &:hover {
      background-color: #0000001f;
      border-radius: 4px;
    }
    padding: 5px;
    box-sizing: content-box;
  }
  margin: -3px -10px -5px -10px;
`


export default ContentWrapper
