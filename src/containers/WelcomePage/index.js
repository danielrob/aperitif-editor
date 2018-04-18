import React from 'react'
import { FormattedMessage } from 'react-intl'

import WelcomeWrapper from './WelcomeWrapper'
import messages from './messages'

const Welcome = () => (
  <WelcomeWrapper>
    <FormattedMessage {...messages.welcome} />
  </WelcomeWrapper>
)

export default Welcome
