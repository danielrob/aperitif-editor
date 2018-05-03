import classNames from 'classnames'

export const addClassNames = (...args) => ({ className: classNames(...args) })
export const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : undefined
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
export const spaces = (amount = 1) => '\u00A0'.repeat(amount)
export const indent = (amount = 1) => spaces(amount * 2)
