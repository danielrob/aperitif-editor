import styled from 'styled-components'

const InvisibleTextArea = styled.textarea.attrs({
  rows: 10,
})`
  font-size: 15px;
  color: orange;
  border: none;
  width: 100%;
  outline: none;
  padding: 5px 0 5px 12px;
`

export default InvisibleTextArea
