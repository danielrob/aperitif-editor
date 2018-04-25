import classNames from 'classnames'

export const addClassNames = (...args) => ({ className: classNames(...args) })
export const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : undefined
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
