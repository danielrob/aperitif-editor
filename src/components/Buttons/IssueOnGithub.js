import React from 'react'

import GithubButton from './GithubButton'

const IssueOnGithub = ({ hide }) => !hide && (
  <GithubButton left="58%">
    <a href="https://github.com/danielrob/aperitif">
      <IssueOpenIcon />
      Get involved{' '}
      <span role="img" aria-label="let's do this">
        🚀
      </span>
    </a>
  </GithubButton>
)

const IssueOpenIcon = () => (
  <svg
    width="16"
    height="16"
    className="octicon octicon-issue-opened"
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
      d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
    />
  </svg>
)

export default IssueOnGithub
