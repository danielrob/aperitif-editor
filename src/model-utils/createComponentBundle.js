/* eslint-disable prefer-const */
import { capitalize } from 'utils'
import { DIR, STYLED_COMPONENT } from 'constantz'

import {
  addNames,
  addFiles,
  addExpressions,
  addInvocations,
} from './model-creation'

const createComponentBundle = ({
  baseName,
  state,
  state: { names, files, rootFiles, expressions, invocations },
  declParamIds,
  invocationIds,
}) => {
  let nextNames = names
  let nextFiles = files
  let nextRootFiles = rootFiles
  let nextExpressions = expressions
  let nextInvocations = invocations

  /* names - for the new component bundle */
  let dirName = getNewComponentName(names, capitalize(baseName))
  let indexName = 'index'
  let wrapperName = `${dirName}Wrapper`;

  [nextNames, dirName, indexName, wrapperName] = addNames(names, dirName, indexName, wrapperName)

  // NEW COMPONENT WRAPPER
  let wrapperExpression = { nameId: wrapperName, type: STYLED_COMPONENT, tag: 'div' };
  [nextExpressions, wrapperExpression] = addExpressions(nextExpressions, wrapperExpression)

  // the invocation of the wrapper component in the new component definition
  let wrapperInvoke = {
    nameId: wrapperName,
    source: null,
    invocationIds,
    closed: !invocationIds.length,
    expressionId: wrapperExpression,
  };

  [nextInvocations, wrapperInvoke] = addInvocations(nextInvocations, wrapperInvoke)

  // NEW COMPONENT
  let newComponentExpression = {
    nameId: dirName,
    invocationIds: [wrapperInvoke],
    declParamIds,
  };

  [nextExpressions, newComponentExpression] =
    addExpressions(nextExpressions, newComponentExpression)

  /* files - for each expression + index */
  let indexFile = { nameId: indexName, expressionIds: [newComponentExpression] }
  let wrapperFile = { nameId: wrapperName, expressionIds: [wrapperExpression] };
  [nextFiles, indexFile, wrapperFile] = addFiles(files, indexFile, wrapperFile)

  /* dirs */
  let directory = { nameId: dirName, type: DIR, children: [wrapperFile, indexFile] };
  [nextFiles, directory] = addFiles(nextFiles, directory)
  nextRootFiles = [directory, ...rootFiles]


  return [
    {
      ...state,
      names: nextNames,
      expressions: nextExpressions,
      invocations: nextInvocations,
      rootFiles: nextRootFiles,
      files: nextFiles,
    },
    dirName,
    newComponentExpression,
  ]
}

export default createComponentBundle

const getNewComponentName = (names, baseName = 'NewComponent') => {
  let nextNameSuffix = null
  const checkName = nameId => names[nameId] === `${baseName}${nextNameSuffix || ''}`
  while (Object.keys(names).find(checkName)) {
    nextNameSuffix += 1
  }
  return `${baseName}${nextNameSuffix || ''}`
}
