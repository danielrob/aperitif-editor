import styled from 'styled-as-components'
import theme from 'theme-proxy'
import TextareaAutosize from 'react-autosize-textarea'

const TemplateStringTextArea = styled(TextareaAutosize).attrs({
  cols: 100,
})`
  color: ${theme.colors.orange};
  border: none;
  width: 100%;
  outline: none;
  padding: 5px 0 5px 0;
`

export default TemplateStringTextArea
