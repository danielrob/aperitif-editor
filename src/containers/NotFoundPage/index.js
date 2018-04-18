import React from 'react'
import { FormattedMessage } from 'react-intl'

import NotFoundWrapper from './NotFoundWrapper'
import messages from './messages'

const NotFound = () => (
  <NotFoundWrapper>
    <FormattedMessage {...messages.header} />
  </NotFoundWrapper>
)

export default NotFound
