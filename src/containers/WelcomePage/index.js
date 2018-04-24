import React from 'react'
import styled from 'styled-as-components'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const Welcome = () => <FormattedMessage {...messages.welcome} />

export default styled(Welcome).as.div`

`
