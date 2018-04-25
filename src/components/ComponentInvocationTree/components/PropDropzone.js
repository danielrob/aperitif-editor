import styled from 'styled-components'

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin: 0 2px;
  border: 1px dotted;
  border-radius: 5px;
  font-size: ${props => props.isOver ? '16px' : '14px'};
  transition: font-size 50ms;
  ${props => props.isOver && 'color: #333;'}
`
