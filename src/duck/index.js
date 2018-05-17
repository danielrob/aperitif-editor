/* eslint-disable prefer-const */
import { createAction } from 'redux-actions'

import {
  addNames,
  addParams,
  addFiles,
  addExpressions,
  addInvocations,
  insertAt,
  insertAtKey,
  removeAtKey,
  update,
  updateAtKey,
} from 'model-utils'
import { DIR, STYLED_COMPONENT, componentExpressionTypes, PARAM_INVOCATION } from 'constantz'
import { capitalize } from 'utils'

import { getNewComponentName } from './helpers'
import getTestDB from './getTestDB'

export const REACT_CHILDREN_INVOCATION_ID = 1

// Editor
export const CHANGE_EDITOR_CURRENT_FILE = 'CHANGE_EDITOR_CURRENT_FILE'

// ORM
// create-esk
export const ADD_NEW_COMPONENT_TO_COMPONENT_INVOCATION_FROM_PROP = 'ADD_NEW_COMPONENT_TO_COMPONENT_INVOCATION_FROM_PROP'
export const ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION = 'ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION'
export const ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION = 'ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION'
export const ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD = 'ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD'
export const ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION = 'ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION'

// update-esk
export const CHANGE_NAME = 'CHANGE_NAME'
export const MOVE_INVOCATION = 'MOVE_INVOCATION'
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

      // update the target invocation
      const updater = invocation => insertAtKey(invocation, 'paramIds', 0, paramId)
      const nextInvocations = update(invocations, targetInvocationId, updater)

      // update the target invocations expression with new param info if relevant
      if (invocationExpressionId) {
        const { paramIds, ...expression } = expressions[invocationExpressionId]
        const nameMatchParamId = paramIds.find(id => params[id].nameId === nameId)

        if (nameMatchParamId) {
          const paramUpdater = ({ count, ...param }) => ({
            ...param,
            count: count ? count + 1 : 1,
          })
          nextState = updateAtKey(nextState, 'params', nameMatchParamId, paramUpdater)
        } else {
          let nextParams = params
          let newParam = { nameId, count: 1, payload };
          [nextParams, newParam] = addParams(nextParams, newParam)
          nextState = update(nextState, 'params', nextParams)

          nextState = updateAtKey(nextState, 'expressions', invocationExpressionId, ({
            ...expression,
            paramIds: [...paramIds, newParam],
          }))
        }
      }

      return update(nextState, 'invocations', nextInvocations)
    }


    case ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD: {
      const { invocations } = state
      const { targetInvocationId, targetPosition, prop: { paramId, nameId } } = action.payload

      /* Creates */
      let paramInvocation = { nameId, paramIds: [paramId], type: PARAM_INVOCATION, source: null }
      let nextInvocations
      [nextInvocations, paramInvocation] = addInvocations(invocations, paramInvocation)

      /* Update */
      const updater = ivn => ({
        ...ivn,
        invocationIds: insertAt(ivn.invocationIds, targetPosition, paramInvocation),
        closed: false,
      })

      return update(state, 'invocations', update(nextInvocations, targetInvocationId, updater))
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
          source: null,
          closed: true,
          expressionId,
        })

      /* UPDATES */
      const updater = ivn => insertAtKey(ivn, 'invocationIds', targetPosition, newInvocationId)

      return update(state, 'invocations', update(nextInvocations, targetInvocationId, updater))
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
        ...insertAtKey(ivn, 'invocationIds', targetPosition, sourceInvocationId),
        closed: false,
      })
      nextInvocations = update(nextInvocations, targetInvocationId, updater)

      return update(state, 'invocations', nextInvocations)
    }


    case ADD_NEW_COMPONENT_TO_COMPONENT_INVOCATION_FROM_PROP: {
      const { names, files, rootFiles, expressions, invocations, params } = state
      const {
        targetInvocationId,
        targetPosition,
        prop: {
          paramId,
          name,
          nameId,
          payload,
          asChild,
        },
      } = action.payload

      /* CREATE */
      /* names - for the new component bundle */
      let dirName = getNewComponentName(names, capitalize(name))
      let indexName = 'index'
      let wrapperName = `${dirName}Wrapper`
      let nextNames

      [nextNames, dirName, indexName, wrapperName] =
        addNames(names, dirName, indexName, wrapperName)

      /* params - a new one if the initial prop is being passed as an attribute */
      let nextParams = params
      let newParam

      if (!asChild) {
        [nextParams, newParam] = addParams(nextParams, { nameId, payload })
      }

      /* expressions & invocations */
      let nextExpressions = expressions
      let nextInvocations = invocations

      // NEW COMPONENT WRAPPER
      let wrapperExpression = { nameId: wrapperName, type: STYLED_COMPONENT };
      [nextExpressions, wrapperExpression] = addExpressions(expressions, wrapperExpression)

      // the invocation of the wrapper component in the new component definition
      let wrapperInvoke = {
        nameId: wrapperName,
        source: null,
        invocationIds: asChild ? [REACT_CHILDREN_INVOCATION_ID] : [],
        closed: !asChild,
        expressionId: wrapperExpression,
      };

      [nextInvocations, wrapperInvoke] = addInvocations(nextInvocations, wrapperInvoke)

      // NEW COMPONENT
      const newComponentInvocationInvocationIds = []

      if (asChild) {
        // create an invocation of the dragged prop to place inside the new component invocation
        let paramInvocation = { nameId, type: PARAM_INVOCATION, paramIds: [paramId], source: null };
        [nextInvocations, paramInvocation] = addInvocations(nextInvocations, paramInvocation)
        newComponentInvocationInvocationIds.push(paramInvocation)
      }

      let newComponentExpression = {
        nameId: dirName,
        invocationIds: [wrapperInvoke],
        paramIds: !asChild ? [newParam] : [],
      };

      [nextExpressions, newComponentExpression] =
        addExpressions(expressions, newComponentExpression)

      // the invocation of the newly created component to be placed at the drop target position
      let newComponentInvocation = {
        nameId: dirName,
        source: null,
        paramIds: !asChild ? [paramId] : [],
        invocationIds: newComponentInvocationInvocationIds,
        closed: !asChild,
        expressionId: newComponentExpression,
      };

      [nextInvocations, newComponentInvocation] =
        addInvocations(nextInvocations, newComponentInvocation)

      /* files - for each expression + index */
      let indexFile = { nameId: indexName, expressionIds: [newComponentExpression] }
      let wrapperFile = { nameId: wrapperName, expressionIds: [wrapperExpression] }
      let nextFiles
      [nextFiles, indexFile, wrapperFile] = addFiles(files, indexFile, wrapperFile)

      /* dirs */
      let directory = { nameId: dirName, type: DIR, children: [wrapperFile, indexFile] };
      [nextFiles, directory] = addFiles(nextFiles, directory)

      /* UPDATE */
      // add the new component invocation to the target position
      const updater = invocation => ({
        ...insertAtKey(invocation, 'invocationIds', targetPosition, newComponentInvocation),
        closed: false,
      })
      nextInvocations = update(nextInvocations, targetInvocationId, updater)

      return {
        ...state,
        names: nextNames,
        expressions: nextExpressions,
        invocations: nextInvocations,
        rootFiles: [directory, ...rootFiles],
        files: nextFiles,
        params: nextParams,
      }
    }


    default:
      return state
  }
}

export const addNewComponentFromPropToInvocation = createAction(
  ADD_NEW_COMPONENT_TO_COMPONENT_INVOCATION_FROM_PROP
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

export const changeName = createAction(
  CHANGE_NAME
)
