export const RESOLVE_ALIASES = ['containers', 'components']

// getInitialState creates these model ids
export const COMPONENTS_FILE_ID = 1
export const CONTAINERS_FILE_ID = 2
export const REACT_CHILDREN_DECLARATION_PARAM_ID = 1
export const REACT_CHILDREN_CALL_PARAM_ID = 1
export const REACT_CHILDREN_INVOCATION_ID = 1
export const INDEX_NAME_ID = 1
export const KEY_NAME_ID = 2
export const ID_NAME_ID = 3
export const APP_CONTAINER_NAME_ID = 8


/*
  fileTypes
*/
export const JS = 'js'
export const SC = '💅'
export const JSON_TYPE = 'json'
export const DIR = 'dir'

export const fileTypes = { JS, SC, DIR, JSON_TYPE }
export const fileTypesArray = Object.keys(fileTypes).map(k => fileTypes[k])


/*
  declarationTypes
*/
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


/*
 component declaration types
*/
export const componentDeclarationTypes = [
  STATELESS_FUNCTION_COMPONENT,
  STYLED_COMPONENT,
  CLASS_COMPONENT,
]


/*
  invocation types
*/
export const VAR_INVOCATION = 'var invocation'
export const PROPERTY_ACCESS = '.property access'
export const IMPORT_VAR = 'import var'
export const ARRAY_MAP_METHOD = '.map invocation'
export const COMPONENT_INVOCATION = 'component invocation' // also draggable
export const PARAM_INVOCATION = 'param invocation' // also draggable


/*
  draggable types
*/
export const PROP = 'prop'
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


/*
  export types
*/
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
