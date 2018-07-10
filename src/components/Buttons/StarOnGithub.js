import React from 'react'

import GithubButton from './GithubButton'

const StarOnGithub = () => (
  <GithubButton left="40%" leftCalc="calc(58% - 155px)">
    <a href="https://github.com/danielrob/aperitif">
      <Star />
      Star on Github{' '}
      <span role="img" aria-label="ribbon">
        🎀
      </span>
    </a>
  </GithubButton>
)
const Star = () => (
  <svg
    width="16"
    height="16"
    className="octicon octicon-star"
    viewBox="0 0 14 16"
    version="1.1"
    aria-hidden="true"
    style={{
      display: 'inline-block',
      transform: 'translateY(-1px)',
      marginRight: '3px',
    }}
  >
    <path
      fillRule="evenodd"
      d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
    />
  </svg>
)

export default StarOnGithub
