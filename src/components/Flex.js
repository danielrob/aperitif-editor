import styled from 'styled-as-components'

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${props => props.aiend && 'align-items: flex-end;'}
`

export default Flex
