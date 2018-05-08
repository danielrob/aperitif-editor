import T from 'prop-types'
import { isString, isBoolean, isPlainObject, isArray } from 'lodash'
import classNames from 'classnames'

export const addClassNames = (...args) => ({ className: classNames(...args) })
export const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : undefined
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
export const composed = (...fns) => fns.reverse().reduce((f, g) => (...args) => f(g(...args)))
export const spaces = (amount = 1) => '\u00A0'.repeat(amount)
export const indent = (amount = 1) => spaces(amount * 2)
export const getId = ((id = 0) => () => (`${id += 1}`))() // eslint-disable-line
export const getPropType = p =>
  (isString(p) && T.string) ||
  (isBoolean(p) && T.bool) ||
  (isPlainObject(p) && T.object) ||
  (isArray(p) && T.array) ||
  null
