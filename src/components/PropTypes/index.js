import { maxBy } from 'lodash'
import C from 'check-types'
import React from 'react'
import JSstringify from 'javascript-stringify'

import { indent } from 'utils'
import { Input, Line } from 'components'

import { sortProps } from 'components/Props/helpers'

const PropTypes = ({ props, nameId }) => {
  const maxCount = (maxBy(props, 'count') || { count: 0 }).count
  return !!props.length && (
    <React.Fragment>
      <br />
      <Input nameId={nameId} />.propTypes = {'{'}
      {props.sort(sortProps).map(
        ({ name, count, payload }) =>
          count && (
            <div key={name}>
              {indent(1)}
              <span
                data-tip={JSstringify(payload, null, 2)}
                data-for="prop"
                data-delay-show="250"
              >
                {name}
              </span>
              : {getPropType(payload)}
              {count === maxCount && C.not.null(payload) && '.isRequired'}
              ,
            </div>
          )
      )}
      <Line statement>{'}'}</Line>
    </React.Fragment>
  )
}

export default PropTypes

const getPropType = (payload, name, nested) => {
  if (C.null(payload)) {
    return 'PropTypes.any'
  }
  if (C.string(payload)) {
    return 'PropTypes.string'
  }
  if (C.boolean(payload)) {
    return 'PropTypes.bool'
  }
  if (C.number(payload)) {
    return 'PropTypes.number'
  }
  if (C.object(payload)) {
    if (nested) {
      return 'PropTypes.object'
    }
    return (
      <React.Fragment>
        T.shape({'{'}
        <br />
        {Object.keys(payload).map(key => (
          <React.Fragment key={key}>
            {indent(2)}
            <span
              data-tip={JSstringify(payload[key], null, 2)}
              data-for="prop"
              data-delay-show="250"
            >
              {key}
            </span>
            : {getPropType(payload[key], null, true)},
            <br />
          </React.Fragment>
        ))}
        {indent(1)}
        {'}'})
      </React.Fragment>
    )
  }
  if (C.array(payload)) {
    if (nested) {
      return 'PropTypes.array'
    }
    return `PropTypes.arrayOf(${getPropType(payload[0], null, true)})`
  }
}
