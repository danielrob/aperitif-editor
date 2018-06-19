import React from 'react'
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'
import styled from 'styled-as-components'

const Json = ({ text }) => (
  <ReactJsonSyntaxHighlighter obj={text} />
)

export default styled(Json).as.div`
  font-size: 14px;
  color: #8a6a6a;

  .string {
    color: #506317;
  }
  .boolean {
    color: #e00000;
  }
  .null {
    color: #e00000;
  }
  .key {
    color: #3f39a2;
  }
  .number {
    color: #000000;
  }
`
