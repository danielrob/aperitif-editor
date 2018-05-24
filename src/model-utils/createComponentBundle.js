/* eslint-disable prefer-const */
import { capitalize } from 'utils'
import { DIR, STYLED_COMPONENT } from 'constantz'

import {
  addNames,
  addFiles,
  addDeclarations,
  addInvocations,
} from './model-creation'

const createComponentBundle = ({
  baseName,
  state,
  state: { names, files, rootFiles, declarations, invocations },
  declParamIds = [],
  invocationIds = [],
}) => {
  let nextNames = names
  let nextFiles = files
  let nextRootFiles = rootFiles
  let nextDeclarations = declarations
  let nextInvocations = invocations

  /* names - for the new component bundle */
  let dirName = getNewComponentName(names, capitalize(baseName))
  let indexName = 'index'
  let wrapperName = `${dirName}Wrapper`;

  [nextNames, dirName, indexName, wrapperName] = addNames(names, dirName, indexName, wrapperName)

  // NEW COMPONENT WRAPPER
  let wrapperDeclaration = { nameId: wrapperName, type: STYLED_COMPONENT, tag: 'div' };
  [nextDeclarations, wrapperDeclaration] = addDeclarations(nextDeclarations, wrapperDeclaration)

  // the invocation of the wrapper component in the new component definition
  let wrapperInvoke = {
    nameId: wrapperName,
    source: null,
    invocationIds,
    closed: !invocationIds.length,
    declarationId: wrapperDeclaration,
  };

  [nextInvocations, wrapperInvoke] = addInvocations(nextInvocations, wrapperInvoke)

  // NEW COMPONENT
  let newComponentDeclaration = {
    nameId: dirName,
    invocationIds: [wrapperInvoke],
    declParamIds,
  };

  [nextDeclarations, newComponentDeclaration] =
    addDeclarations(nextDeclarations, newComponentDeclaration)

  /* files - for each declaration + index */
  let indexFile = { nameId: indexName, declarationIds: [newComponentDeclaration] }
  let wrapperFile = { nameId: wrapperName, declarationIds: [wrapperDeclaration] };
  [nextFiles, indexFile, wrapperFile] = addFiles(files, indexFile, wrapperFile)

  /* dirs */
  let directory = { nameId: dirName, type: DIR, children: [wrapperFile, indexFile] };
  [nextFiles, directory] = addFiles(nextFiles, directory)
  nextRootFiles = [directory, ...rootFiles]


  return [
    {
      ...state,
      names: nextNames,
      declarations: nextDeclarations,
      invocations: nextInvocations,
      rootFiles: nextRootFiles,
      files: nextFiles,
    },
    dirName,
    newComponentDeclaration,
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
