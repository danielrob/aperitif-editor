export const required = 'required'
export const requiredOrNull = 'requiredOrNull'

export const SEMIS = true

/* fileTypes */
export const JS = 'js'
export const DIR = 'dir'

export const fileTypes = { JS, DIR }
export const fileTypesArray = [JS, DIR]

/* declarationTypes */
export const PROJECT_INDEX = 'top level index.js file'
export const LOOKTHROUGH = "I'm all about my invocation, that's it"
export const CLASS_COMPONENT = 'class_component'
export const STATELESS_FUNCTION_COMPONENT = 'stateless_function_component'
export const STYLED_COMPONENT = 'styled_component'
export const STANDARD = 'standard'

export const declarationTypes = {
  PROJECT_INDEX,
  CLASS_COMPONENT,
  LOOKTHROUGH,
  STATELESS_FUNCTION_COMPONENT,
  STYLED_COMPONENT,
  STANDARD,
}

export const componentDeclarationTypes = [
  STATELESS_FUNCTION_COMPONENT,
  STYLED_COMPONENT,
]

/* export types */
export const DEFAULT = 'export default'
export const DEFAULT_INLINE = 'export default <declaration>'
export const INLINE = 'export when declared'

export const exportTypes = {
  DEFAULT,
  DEFAULT_INLINE,
  INLINE,
  false: 'no export',
}

/* draggable / invocation types */
export const PROP = 'prop'
export const COMPONENT_INVOCATION = 'component invocation'
export const PARAM_INVOCATION = 'param invocation'
export const PROPS_SPREAD = '...props'
export const FILE = 'file'

export const DraggableTypes = {
  PROP,
  COMPONENT_INVOCATION,
  PARAM_INVOCATION,
  PROPS_SPREAD,
  FILE,
  DIR,
}
