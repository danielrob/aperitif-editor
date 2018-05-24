import invariant from 'invariant'
import { JS, STATELESS_FUNCTION_COMPONENT, DEFAULT, COMPONENT_INVOCATION, required, requiredOrNull } from 'constantz'
import { getNextId, getEntitiesAdder } from './helpers'

/*
  Model creation functions
*/
/**
  * The following functions have this signature:
  * @param {Object} modelTable: existing model table to update
  * @param {...Object} newPartial: combined with default model props to create a new model instance
 */
export const addNames = (names, ...args) => {
  invariant(args && args[0], 'at least one name is required')
  return args.reduce((out, name) => {
    const [nextNames, ...nextIds] = out
    const nextNameId = getNextId(nextNames)
    return [
      { ...nextNames, [nextNameId]: name },
      ...nextIds, nextNameId,
    ]
  }, [names])
}

export const addDeclParams = getEntitiesAdder({
  nameId: required,
  payload: null,
  // type specific items
  isSpreadMember: false, // react component declarations
  count: null,
})

export const addCallParams = getEntitiesAdder({
  declParamId: requiredOrNull,
  nameId: null,
  valueNameIds: [],
  isCallSpreadMember: true,
})


export const addFiles = getEntitiesAdder({
  nameId: required,
  type: JS,
  children: [],
  declarationIds: [],
})

export const addDeclarations = getEntitiesAdder({
  nameId: required,
  type: STATELESS_FUNCTION_COMPONENT,
  declParamIds: [],
  exportType: DEFAULT,
  invocationIds: [],
  // type specific items
  tag: null, // styled-component
  text: undefined,
})

export const addInvocations = getEntitiesAdder({
  nameId: required,
  source: null,
  callParamIds: [],
  invocationIds: [],
  // type specific items
  type: COMPONENT_INVOCATION,
  closed: false, // component-invocation
  hasPropsSpread: false,
  pseudoSpreadPropsNameId: null,
  declarationId: null,
  inline: false,
})

