export const RESOLVE_ALIASES = ['containers', 'components']

/* fileTypes */
export const JS = 'js'
export const JSON_TYPE = 'json'
export const DIR = 'dir'

export const fileTypes = { JS, DIR, JSON_TYPE }
export const fileTypesArray = Object.keys(fileTypes).map(k => fileTypes[k])

/* declarationTypes */
export const PROJECT_INDEX = 'top level index.js file'
export const LOOKTHROUGH = "I'm all about my invocation, that's it"
export const CLASS_COMPONENT = 'class_component'
export const CLASS_METHOD = 'class_method'
export const CLASS_PROP = 'class_prop'
export const STATELESS_FUNCTION_COMPONENT = 'stateless_function_component'
export const STYLED_COMPONENT = 'styled_component'
export const CONST = 'const'
export const STANDARD = 'standard'
export const PROPS = 'props'
export const OBJECT_LITERAL_KEY = 'object literal key'

export const declarationTypes = {
  PROJECT_INDEX,
  LOOKTHROUGH,
  CLASS_COMPONENT,
  CLASS_METHOD,
  CLASS_PROP,
  STATELESS_FUNCTION_COMPONENT,
  STYLED_COMPONENT,
  CONST,
  STANDARD,
  PROPS,
  OBJECT_LITERAL_KEY,
}
export const declarationTypesArray = Object.keys(declarationTypes).map(k => declarationTypes[k])

export const componentDeclarationTypes = [
  STATELESS_FUNCTION_COMPONENT,
  STYLED_COMPONENT,
  CLASS_COMPONENT,
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
export const exportTypesArray = Object.keys(exportTypes).map(k => exportTypes[k])

/* draggable types */
export const PROP = 'prop'
export const PROPS_SPREAD = '...props'
export const FILE = 'file'

/* invocation (some are draggable) types */
export const COMPONENT_INVOCATION = 'component invocation'
export const PARAM_INVOCATION = 'param invocation'
export const VAR_INVOCATION = 'var invocation'
export const IMPORT_VAR = 'import var'
export const ARRAY_MAP_METHOD = '.map invocation'

export const DraggableTypes = {
  PROP,
  COMPONENT_INVOCATION,
  PARAM_INVOCATION,
  PROPS_SPREAD,
  FILE,
  DIR,
}
