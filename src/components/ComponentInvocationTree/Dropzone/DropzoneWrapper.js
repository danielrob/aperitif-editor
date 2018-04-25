import styled from 'styled-components'

const DropzoneWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 25px;
  padding: 5px 0;
  margin: -5px 0;
  width: 100%;
  &:hover {
    height: 25px;
  }
  & > .line {
    display: none;
  }
  &:hover > .line {
    display: block;
  }

  ${props => props.isOver && 'opacity: 0.5'}
  ${props => props.isOver && 'height: 25px'}

  margin-left: ${props => Number(
    (Object.keys(props).find(key => key.includes('ind')) || '').replace('ind', '')
  ) * 6}px;
`

export default DropzoneWrapper
