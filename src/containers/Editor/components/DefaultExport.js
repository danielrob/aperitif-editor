import React from 'react'
import { Line } from 'components'

const DefaultExport = ({ defaultName }) => (
  defaultName ? <Line statement>`export default ${defaultName}`</Line> : null
)

export default DefaultExport
