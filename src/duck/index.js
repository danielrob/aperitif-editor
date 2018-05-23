/* eslint-disable prefer-const */
import { createAction } from 'redux-actions'
import { singular } from 'pluralize'

import {
  addNames,
  addFiles,
  addExpressions,
  addDeclParams,
  addCallParams,
  addInvocations,
  insertAt,
  insertAtKey,
  removeAtKey,
  filterOutAtKey,
  deleteKey,
  update,
  updateAtKey,
  createComponentBundle,
} from 'model-utils'
import { DIR, componentExpressionTypes, PARAM_INVOCATION, STYLED_COMPONENT } from 'constantz'
import { capitalize } from 'utils'

import getTestDB, {
  REACT_CHILDREN_INVOCATION_ID,
  REACT_CHILDREN_DECLARATION_PARAM_ID,
  KEY_NAME_ID,
  ID_NAME_ID,
} from './getTestDB'

// Editor
export const CHANGE_EDITOR_CURRENT_FILE = 'CHANGE_EDITOR_CURRENT_FILE'

// ORM
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN'
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE'
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD'
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP'
export const ADD_NEW_STYLED_COMPONENT_TO_INVOCATION = 'ADD_NEW_STYLED_COMPONENT_TO_INVOCATION'
export const ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION = 'ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION'
export const ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION = 'ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION'
export const ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD = 'ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD'
export const ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION = 'ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION'
export const CHANGE_NAME = 'CHANGE_NAME'
export const MOVE_INVOCATION = 'MOVE_INVOCATION'
export const MERGE_FILE = 'MERGE_FILE'
export const SET_PARAM_IS_SPREAD_MEMBER_TRUE = 'SET_PARAM_IS_SPREAD_MEMBER_TRUE'

export default function appReducer(state = getTestDB(), action) {
  switch (action.type) {
    case CHANGE_NAME: {
      const { nameId, value } = action.payload

      return update(state, 'names',
        names => update(names, nameId, value)
      )
    }


    case CHANGE_EDITOR_CURRENT_FILE: {
      const { currentFileId, files, names } = state
      let { payload: nextId } = action
      const { type, children } = files[nextId]

      if (type === DIR) {
        nextId = children.find(fileId => names[files[fileId].nameId].includes('index'))
      }

      return update(state, 'currentFileId', nextId || currentFileId)
    }


    case SET_PARAM_IS_SPREAD_MEMBER_TRUE: {
      const { paramId } = action.payload

      return update(state, 'params',
        params => updateAtKey(params, paramId, 'isSpreadMember', true)
      )
    }


    case ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION: {
      const { invocationId } = action.payload

      return update(state, 'invocations',
        invocations => updateAtKey(invocations, invocationId, 'hasPropsSpread', true)
      )
    }


    case ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION: {
      const { invocations, expressions, params } = state
      const { targetInvocationId, prop: { paramId } } = action.payload
      const { nameId, payload } = params[paramId]
      const invocationExpressionId = invocations[targetInvocationId].expressionId

      let nextState = state
      let nextParams = params
      let nextInvocations = invocations

      // create new call param referencing the dropped prop
      let callParam = { declParamId: paramId };
      [nextParams, callParam] = addCallParams(nextParams, callParam)
      nextState = update(nextState, 'params', nextParams)

      // update the target invocation
      const updater = invocation => insertAtKey(invocation, 'callParamIds', callParam, 0)
      nextInvocations = update(nextInvocations, targetInvocationId, updater)

      // update the target invocations expression with new param info if relevant
      if (invocationExpressionId) {
        const { declParamIds, ...expression } = expressions[invocationExpressionId]
        const nameMatchParamId = declParamIds.find(id => params[id].nameId === nameId)

        if (nameMatchParamId) {
          const paramUpdater = ({ count, ...param }) => ({
            ...param,
            count: count ? count + 1 : 1,
          })
          nextState = updateAtKey(nextState, 'params', nameMatchParamId, paramUpdater)
        } else {
          let newDeclParam = { nameId, count: 1, payload };
          [nextParams, newDeclParam] = addDeclParams(nextParams, newDeclParam)
          nextState = update(nextState, 'params', nextParams)

          nextState = updateAtKey(nextState, 'expressions', invocationExpressionId, ({
            ...expression,
            declParamIds: [...declParamIds, newDeclParam],
          }))
        }
      }

      return update(nextState, 'invocations', nextInvocations)
    }


    case ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD: {
      const { invocations, params } = state
      const { targetInvocationId, targetPosition, prop: { paramId, nameId } } = action.payload
      let nextState = state

      /* Creates */
      // create new call param referencing the dropped prop
      let nextParams = params
      let callParam = { declParamId: paramId };
      [nextParams, callParam] = addCallParams(nextParams, callParam)
      nextState = update(nextState, 'params', nextParams)

      // create param invocation
      let paramInvocation = { nameId, callParamIds: [callParam], type: PARAM_INVOCATION }
      let nextInvocations
      [nextInvocations, paramInvocation] = addInvocations(invocations, paramInvocation)

      /* Update */
      const updater = ivn => ({
        ...ivn,
        invocationIds: insertAt(ivn.invocationIds, paramInvocation, targetPosition),
        closed: false,
      })

      return update(nextState, 'invocations', update(nextInvocations, targetInvocationId, updater))
    }


    case ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION: {
      const { names, invocations, files, expressions } = state
      const { targetInvocationId, targetPosition, fileId, isDirectory } = action.payload

      let file = files[fileId]
      if (isDirectory) {
        file = files[file.children.find(id => names[files[id].nameId] === 'index')]
      }

      const expressionId = file.expressionIds.find(
        id => componentExpressionTypes.includes(expressions[id].type)
      )

      /* CREATES */
      let [nextInvocations, newInvocationId] = // eslint-disable-line prefer-const
        addInvocations(invocations, {
          nameId: expressions[expressionId].nameId,
          closed: true,
          expressionId,
        })

      /* UPDATES */
      const updater = ivn => insertAtKey(ivn, 'invocationIds', newInvocationId, targetPosition)

      return update(state, 'invocations', update(nextInvocations, targetInvocationId, updater))
    }

    case MERGE_FILE: {
      const { sourceFileId, targetFileId } = action.payload

      return update(state, 'files', files => {
        let nextFiles = files

        // add expressions to other file
        nextFiles = update(nextFiles, targetFileId,
          file => update(file, 'expressionIds', ids => [
            ...ids,
            ...files[sourceFileId].expressionIds,
          ])
        )

        // Delete file
        const dirId = Object.keys(nextFiles).find(
          fileId => nextFiles[fileId].children.includes(sourceFileId)
        )

        nextFiles = update(nextFiles, dirId,
          file => filterOutAtKey(file, 'children', sourceFileId)
        )

        nextFiles = deleteKey(nextFiles, sourceFileId)

        return nextFiles
      })
    }


    case MOVE_INVOCATION: {
      const { invocations } = state
      const {
        sourceParentId,
        sourceInvocationId,
        targetInvocationId,
        targetPosition,
      } = action.payload
      let updater
      let nextInvocations

      const sourcePosition = invocations[sourceParentId].invocationIds.findIndex(
        id => id === sourceInvocationId,
      )

      /* UPDATES */
      // remove
      updater = ivn => {
        let nextIvn = removeAtKey(ivn, 'invocationIds', sourcePosition)
        if (!nextIvn.invocationIds.length) {
          nextIvn = {
            ...nextIvn,
            closed: true,
          }
        }
        return nextIvn
      }
      nextInvocations = update(invocations, sourceParentId, updater)

      // insert
      updater = ivn => ({
        ...insertAtKey(ivn, 'invocationIds', sourceInvocationId, targetPosition),
        closed: false,
      })
      nextInvocations = update(nextInvocations, targetInvocationId, updater)

      return update(state, 'invocations', nextInvocations)
    }

    case ADD_NEW_STYLED_COMPONENT_TO_INVOCATION: {
      let {
        names: nextNames,
        files: nextFiles,
        expressions: nextExpressions,
        invocations: nextInvocations,
        params: nextParams,
      } = state

      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name, nameId },
      } = action.payload

      let newName = capitalize(name);
      [nextNames, newName] = addNames(nextNames, newName)

      let styledExpression = { nameId: newName, type: STYLED_COMPONENT, tag: 'div' };
      [nextExpressions, styledExpression] = addExpressions(nextExpressions, styledExpression)

      let droppedCallParam = { declParamId: paramId };
      [nextParams, droppedCallParam] = addCallParams(nextParams, droppedCallParam)

      let paramInvocation = { nameId, type: PARAM_INVOCATION, callParamIds: [droppedCallParam] };
      [nextInvocations, paramInvocation] = addInvocations(nextInvocations, paramInvocation)

      let styledInvocation = {
        nameId: newName,
        invocationIds: [paramInvocation],
        expressionId: styledExpression,
      };
      [nextInvocations, styledInvocation] = addInvocations(nextInvocations, styledInvocation)

      nextInvocations = update(nextInvocations, targetInvocationId,
        invocation => ({
          ...insertAtKey(invocation, 'invocationIds', styledInvocation, targetPosition),
          closed: false,
        })
      )

      let styleFile = { nameId: newName, expressionIds: [styledExpression] };
      [nextFiles, styleFile] = addFiles(nextFiles, styleFile)

      const dirId = Object.keys(nextFiles).find(
        id => nextFiles[id].children.includes(state.currentFileId)
      )

      nextFiles = update(nextFiles, dirId,
        dir => insertAtKey(dir, 'children', styleFile)
      )

      return {
        ...state,
        names: nextNames,
        expressions: nextExpressions,
        invocations: nextInvocations,
        files: nextFiles,
        params: nextParams,
      }
    }

    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD: {
      let nextState = state
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name, payload },
      } = action.payload

      const baseName = singular(name)
      const propPayloadKeys = Object.keys(payload)

      // names
      let pseudoSpreadPropsName = baseName
      let newPayloadParamNames = propPayloadKeys

      nextState = update(nextState, 'names',
        names => {
          let nextNames = names;
          [nextNames, pseudoSpreadPropsName, ...newPayloadParamNames] =
            addNames(nextNames, pseudoSpreadPropsName, ...newPayloadParamNames)
          return nextNames
        }
      )

      // params
      let payloadDeclParams = propPayloadKeys.map((key, id) => ({
        nameId: newPayloadParamNames[id],
        payload: payload[key],
        count: 1,
      }))

      let droppedCallParam = { declParamId: paramId }

      nextState = update(nextState, 'params', params => {
        let nextParams = params;
        [nextParams, droppedCallParam] = addCallParams(nextParams, droppedCallParam);
        [nextParams, ...payloadDeclParams] = addDeclParams(nextParams, ...payloadDeclParams)
        return nextParams
      })


      // new component bundle
      let componentName
      let newComponentExpressionId
      [nextState, componentName, newComponentExpressionId] =
        createComponentBundle({
          baseName,
          state: nextState,
          declParamIds: payloadDeclParams,
          invocationIds: [],
        })

      // add / update invocations
      let newComponentInvocation = {
        nameId: componentName,
        expressionId: newComponentExpressionId,
        callParamIds: [],
        pseudoSpreadPropsNameId: pseudoSpreadPropsName,
        closed: true,
      }

      nextState = update(nextState, 'invocations',
        invocations => {
          let nextInvocations = invocations;
          [nextInvocations, newComponentInvocation] =
            addInvocations(nextInvocations, newComponentInvocation)

          // add the new component invocation to the target position
          const updater = invocation => ({
            ...insertAtKey(invocation, 'invocationIds', newComponentInvocation, targetPosition),
            closed: false,
          })
          return update(nextInvocations, targetInvocationId, updater)
        }
      )

      return nextState
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP: {
      let nextState = state
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name, nameId, payload },
      } = action.payload

      // payload here is checkTypes.array.of.object certified 🚀
      const payloadObjSuperExample = Object.assign({}, ...payload)
      const payloadObjSuperExampleKeys = Object.keys(payloadObjSuperExample)

      // names
      const baseName = singular(name)
      let mapPseudoParamName = baseName
      let newPayloadParamNames = payloadObjSuperExampleKeys

      nextState = update(nextState, 'names',
        names => {
          let nextNames = names;
          [nextNames, mapPseudoParamName, ...newPayloadParamNames] =
            addNames(nextNames, mapPseudoParamName, ...newPayloadParamNames)
          return nextNames
        }
      )

      // params
      let payloadDeclParams = payloadObjSuperExampleKeys.map((key, id) => ({
        nameId: newPayloadParamNames[id],
        payload: payloadObjSuperExample[key], // assume some level of uniformity in payload data
        count: 1,
      }))

      let droppedCallParam = { declParamId: paramId }
      let keyCallParam = {
        declParamId: null,
        nameId: KEY_NAME_ID,
        valueNameIds: [mapPseudoParamName, ID_NAME_ID],
      }

      nextState = update(nextState, 'params', params => {
        let nextParams = params;
        [nextParams, droppedCallParam, keyCallParam] =
          addCallParams(nextParams, droppedCallParam, keyCallParam);
        [nextParams, ...payloadDeclParams] = addDeclParams(nextParams, ...payloadDeclParams)
        return nextParams
      })


      // new component bundle
      let componentName
      let newComponentExpressionId
      [nextState, componentName, newComponentExpressionId] =
        createComponentBundle({
          baseName,
          state: nextState,
          declParamIds: payloadDeclParams,
          invocationIds: [],
        })

      // add / update invocations
      let newComponentInvocation = {
        nameId: componentName,
        expressionId: newComponentExpressionId,
        callParamIds: [keyCallParam],
        pseudoSpreadPropsNameId: mapPseudoParamName,
        closed: true,
      }

      let paramInvocation = { nameId, type: PARAM_INVOCATION, callParamIds: [droppedCallParam] }

      nextState = update(nextState, 'invocations',
        invocations => {
          let nextInvocations = invocations;
          [nextInvocations, newComponentInvocation] =
            addInvocations(nextInvocations, newComponentInvocation)

          paramInvocation.invocationIds = [newComponentInvocation];

          [nextInvocations, paramInvocation] = addInvocations(nextInvocations, paramInvocation)

          // add the new component invocation to the target position
          const updater = invocation => ({
            ...insertAtKey(invocation, 'invocationIds', paramInvocation, targetPosition),
            closed: false,
          })
          return update(nextInvocations, targetInvocationId, updater)
        }
      )

      return nextState
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN: {
      let nextState = state
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name: baseName, nameId },
      } = action.payload

      // component bundle
      let componentName
      let newComponentExpressionId
      [nextState, componentName, newComponentExpressionId] =
        createComponentBundle({
          baseName,
          state: nextState,
          declParamIds: [REACT_CHILDREN_DECLARATION_PARAM_ID],
          invocationIds: [REACT_CHILDREN_INVOCATION_ID],
        })

      // params
      let newCallParam = { declParamId: paramId }
      nextState = update(nextState, 'params', params => {
        let nextParams = params;
        [nextParams, newCallParam] = addCallParams(nextParams, newCallParam)
        return nextParams
      })

      // add / update invocations
      let newComponentInvocation = { nameId: componentName, expressionId: newComponentExpressionId }
      let paramInvocation = { nameId, type: PARAM_INVOCATION, callParamIds: [newCallParam] }

      nextState = update(nextState, 'invocations',
        invocations => {
          let nextInvocations = invocations;
          [nextInvocations, paramInvocation] = addInvocations(nextInvocations, paramInvocation)

          newComponentInvocation.invocationIds = [paramInvocation];
          [nextInvocations, newComponentInvocation] =
            addInvocations(nextInvocations, newComponentInvocation)

          // add the new component invocation to the target position
          const updater = invocation => ({
            ...insertAtKey(invocation, 'invocationIds', newComponentInvocation, targetPosition),
            closed: false,
          })
          return update(nextInvocations, targetInvocationId, updater)
        }
      )

      return nextState
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE: {
      let nextState = state
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name: baseName, nameId, payload },
      } = action.payload

      // params
      let newDeclParam = { nameId, payload }
      let newCallParam = { declParamId: paramId }

      nextState = update(nextState, 'params', params => {
        let nextParams = params;
        [nextParams, newDeclParam] = addDeclParams(nextParams, newDeclParam);
        [nextParams, newCallParam] = addCallParams(nextParams, newCallParam)
        return nextParams
      })

      // component bundle
      let componentName
      let newComponentExpressionId

      [nextState, componentName, newComponentExpressionId] =
        createComponentBundle({ baseName, state: nextState, declParamIds: [newDeclParam] })

      // add & update invocations
      let newComponentInvocation = {
        nameId: componentName,
        callParamIds: [newCallParam],
        expressionId: newComponentExpressionId,
        closed: true,
      }

      nextState = update(nextState, 'invocations',
        invocations => {
          let nextInvocations = invocations;
          [nextInvocations, newComponentInvocation] =
            addInvocations(nextInvocations, newComponentInvocation)

          // add the new component invocation to the target position
          const updater = invocation => ({
            ...insertAtKey(invocation, 'invocationIds', newComponentInvocation, targetPosition),
            closed: false,
          })
          return update(nextInvocations, targetInvocationId, updater)
        }
      )

      return nextState
    }


    default:
      return state
  }
}

export const addNewComponentToInvocationWithChildren = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN
)

export const addNewComponentToInvocationWithAttribute = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE
)

export const addNewComponentToInvocationWithSpread = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD
)

export const addNewComponentToInvocationWithMap = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP
)

export const addNewStyledComponentToInvocation = createAction(
  ADD_NEW_STYLED_COMPONENT_TO_INVOCATION
)

export const changeFile = createAction(
  CHANGE_EDITOR_CURRENT_FILE
)

export const addAttributeToComponentInvocation = createAction(
  ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION
)

export const addParamAsComponentInvocationChild = createAction(
  ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD
)

export const addPropsSpreadToComponentInvocation = createAction(
  ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION
)

export const addInvocationFromFileToCI = createAction(
  ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION
)

export const moveParamToSpread = createAction(
  SET_PARAM_IS_SPREAD_MEMBER_TRUE
)

export const moveInvocation = createAction(
  MOVE_INVOCATION
)

export const mergeFile = createAction(
  MERGE_FILE
)

export const changeName = createAction(
  CHANGE_NAME
)
