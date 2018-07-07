import classNames from 'classnames'
import camelCase from 'camelcase'

export const addClassNames = (...args) => ({ className: classNames(...args) })
export const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : undefined
export const pascalCase = s => camelCase(s, { pascalCase: true })
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
export const composed = (...fns) => fns.reverse().reduce((f, g) => (...args) => f(g(...args)))
export const spaces = (amount = 1) => '\u00A0'.repeat(amount)
export const indent = (amount = 1) => spaces(amount * 2)
export const getId = ((id = 0) => () => (`${id += 1}`))() // eslint-disable-line
export const oneOf = (...fns) => item =>
  fns.slice(1).reduce((out, fn) => out || fn(item), fns[0](item))
export const sortAlphabetically = (a, b) => (a < b && '-1') || (b < a && '1') || 0
export const toArray = obj => Object.entries(obj).map(([, value]) => value)
export const lastItem = arr => arr[arr.length - 1]
export const pD = fn => (e, ...args) => { e.preventDefault(); fn(...args) }
export const pDsP = fn => (e, ...args) => { e.preventDefault(); e.stopPropagation(); fn(...args) }
export const isUrl = str => str.startsWith('http')

export { default as camelCase } from 'camelcase'
