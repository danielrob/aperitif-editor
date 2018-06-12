import { maxBy } from 'lodash'
import C from 'check-types'
import React from 'react'
import JSstringify from 'javascript-stringify'

import { indent } from 'utils'
import { Input, Line } from 'components'

import { sortProps } from 'components/Props/helpers'

const PropTypes = ({ props, nameId }) => {
  const maxCount = (maxBy(props, 'count') || { count: 0 }).count
  return (
    <React.Fragment>
      <Input nameId={nameId} />.propTypes = {'{'}
      {props.sort(sortProps).map(
        ({ name, count, payload }) =>
          count && (
            <div>
              {indent(1)}
              <span data-tip={JSstringify(payload, null, 2)} data-for="prop">
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

const getPropType = (payload, nested) => {
  if (C.null(payload)) {
    return 'T.any'
  }
  if (C.string(payload)) {
    return 'T.string'
  }
  if (C.boolean(payload)) {
    return 'T.bool'
  }
  if (C.number(payload)) {
    return 'T.number'
  }
  if (C.object(payload)) {
    if (nested) {
      return 'T.object'
    }
    return (
      <React.Fragment>
        T.shape({'{'}
        <br />
        {Object.keys(payload).map(key => (
          <React.Fragment>
            {indent(2)}
            <span data-tip={JSstringify(payload[key], null, 2)} data-for="prop">
              {key}
            </span>
            : {getPropType(payload[key], true)},
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
      return 'T.array'
    }
    return `T.arrayOf(${getPropType(payload[0], true)})`
  }
}
