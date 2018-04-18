import classNames from 'classnames'

export const addClassNames = (...args) => ({ className: classNames(...args) })

// get an arbritrary app-unique value for a type dictionary
export const whatev = (incr => () => incr++)(1) // eslint-disable-line no-param-reassign
