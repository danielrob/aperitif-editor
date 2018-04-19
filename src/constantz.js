export const required = 'required'

export const fileTypes = {
  JS: 'js',
  DIR: 'dir',
}

export const expressionTypes = {
  LOOKTHROUGH: 'ignored, but registers an invocation',
  STATELESS_FUNCTION_COMPONENT: 'stateless_function_component',
  STYLED_COMPONENT: 'styled_component',
  STANDARD: 'standard',
}

export const exportTypes = {
  DEFAULT: 'export default',
  DEFAULT_INLINE: 'export default <expression>',
  INLINE: 'export when declared',
  false: 'no export',
}
