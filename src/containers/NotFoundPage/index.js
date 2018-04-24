import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-as-components'

import messages from './messages'

const NotFound = () => <FormattedMessage {...messages.header} />

export default styled(NotFound).as.div`

`
