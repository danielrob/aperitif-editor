import React from 'react'
import { Line } from 'components'

const DefaultExport = ({ name }) => (
  name ? <Line statement>export default {name}</Line> : null
)

export default DefaultExport
