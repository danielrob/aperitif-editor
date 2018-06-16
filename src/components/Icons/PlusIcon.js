import React from 'react'

/* https://fontawesome.com/license Icon: https://fontawesome.com/icons/plus?style=solid */
const PlusIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
  </svg>
)

PlusIcon.defaultProps = {
  width: '9px',
}

export default PlusIcon
