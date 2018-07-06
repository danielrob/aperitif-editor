import styled from 'styled-as-components'
import React from 'react'

const StarOnGithub = () => (
  <a
    className="github-button"
    href="https://github.com/danielrob"
    data-icon="octicon-star"
    aria-label="Star danielrob/aperitif-editor on GitHub"
    data-size="large"
  >
    Star on Github 🎀
  </a>
)

export default styled(StarOnGithub).as.div`
  ${props => props.hide && 'display: none;'}
  position: fixed;
  left: 40%;
  left: calc(58% - 155px);
  bottom: 14px;
  background-color: white;
  z-index: 1;
`
