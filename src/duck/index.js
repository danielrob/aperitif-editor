import { createAction } from 'redux-actions'

import { addNames, addFiles, addExpressions, addInvocations, insertAtKey, updateEntity } from 'model-utils'
import { DIR, STYLED_COMPONENT } from 'constantz'
import { capitalize } from 'utils'

import { getNewComponentName } from './helpers'
import getTestDB from './getTestDB'

export const CREATE_COMPONENT_BUNDLE = 'CREATE_COMPONENT_BUNDLE'
export const ADD_PARAM_TO_COMPONENT_INVOCATION = 'ADD_PARAM_TO_COMPONENT_INVOCATION'
export const MOVE_PARAM_TO_SPREAD = 'MOVE_PARAM_TO_SPREAD'
export const CHANGE_FILE = 'CHANGE_FILE'

export default function appReducer(state = getTestDB(), action) {
  switch (action.type) {
    case CHANGE_FILE: {
      return {
        ...state,
        currentFileId: action.payload,
      }
    }

    case MOVE_PARAM_TO_SPREAD: {
      const { expressions } = state
      const { expressionId, paramId } = action.payload

      const updater = ({ paramIds, spreadParamIds = [], ...rest }) => ({
        ...rest,
        paramIds: paramIds.filter(id => id !== paramId),
        spreadParamIds: [...spreadParamIds, paramId],
      })
      const nextExpressions = updateEntity(expressions, expressionId, updater)

      return {
        ...state,
        expressions: nextExpressions,
      }
    }

    case ADD_PARAM_TO_COMPONENT_INVOCATION: {
      const { invocations } = state
      const { payload: { parentId, item: { id: itemId } } } = action

      const updater = oldInvocation => insertAtKey(oldInvocation, 'paramIds', 0, itemId)
      const nextInvocations = updateEntity(invocations, parentId, updater)

      return {
        ...state,
        invocations: nextInvocations,
      }
    }

    case CREATE_COMPONENT_BUNDLE: {
      const { names, files, rootFiles, expressions, invocations, params } = state
      const {
        payload: {
          parentId,
          position,
          item: {
            name,
            id: itemId,
          },
          // #couldchangeinrefactor
          propAsChild,
          closed,
        },
      } = action

      /* CREATES */
      /* eslint-disable prefer-const */
      // names
      let dirName = getNewComponentName(names, capitalize(name))
      let indexName = 'index'
      let wrapperName = `${dirName}Wrapper`
      let nextNames
      [nextNames, dirName, indexName, wrapperName] =
        addNames(names, dirName, indexName, wrapperName)

      // invocations
      let invoke = {
        nameOrNameId: dirName,
        source: null,
        paramIds: propAsChild ? [] : [itemId],
        modelChildren: propAsChild ? [itemId] : [],
        closed,
      }
      let wrapperInvoke = { nameOrNameId: wrapperName, source: null }
      let nextInvocations
      [nextInvocations, invoke, wrapperInvoke] =
        addInvocations(invocations, invoke, wrapperInvoke)

      // expressions
      let expression =
        { nameId: dirName, invocationIds: [wrapperInvoke], paramIds: [itemId] }
      let wrapperExpression = { nameId: wrapperName, invocationIds: [], type: STYLED_COMPONENT }
      let nextExpressions
      [nextExpressions, expression, wrapperExpression] =
        addExpressions(expressions, expression, wrapperExpression)

      // files
      let indexFile = { nameId: indexName, expressionIds: [expression] }
      let wrapperFile = { nameId: wrapperName, expressionIds: [wrapperExpression] }
      let nextFiles
      [nextFiles, indexFile, wrapperFile] = addFiles(files, indexFile, wrapperFile)

      // dirs
      let directory = { nameId: dirName, type: DIR, children: [wrapperFile, indexFile] };
      [nextFiles, directory] = addFiles(nextFiles, directory)
      /* eslint-enable prefer-const */

      /* UPDATES */
      const updater = ivn => insertAtKey(ivn, 'invocationIds', position, invoke)
      nextInvocations = updateEntity(nextInvocations, parentId, updater)

      return {
        ...state,
        names: nextNames,
        expressions: nextExpressions,
        invocations: nextInvocations,
        rootFiles: [directory, ...rootFiles],
        files: nextFiles,
        params, // todo
      }
    }

    default:
      return state
  }
}

export const createComponentBundle = createAction(
  CREATE_COMPONENT_BUNDLE
)

export const changeFile = createAction(
  CHANGE_FILE
)

export const addParamToComponentInvocation = createAction(
  ADD_PARAM_TO_COMPONENT_INVOCATION
)

export const moveParamToSpread = createAction(
  MOVE_PARAM_TO_SPREAD
)
