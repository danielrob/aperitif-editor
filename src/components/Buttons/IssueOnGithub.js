import styled from 'styled-as-components'
import React from 'react'

const IssueOnGithub = () => (
  <a
    className="github-button"
    href="https://github.com/danielrob"
    data-icon="octicon-issue-opened"
    aria-label="Star danielrob/aperitif-editor on GitHub"
    data-size="large"
  >
    Ideas/bugs 🙏
  </a>
)

export default styled(IssueOnGithub).as.div`
  ${props => props.hide && 'display: none;'}
  position: fixed;
  left: 58%;
  bottom: 14px;
  background-color: white;
  z-index: 1;
`
