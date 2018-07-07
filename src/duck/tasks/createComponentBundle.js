/* eslint-disable prefer-const */
import orm from 'orm'
import { pascalCase } from 'utils'
import { DIR, SC, STYLED_COMPONENT, INDEX_NAME_ID, COMPONENTS_FILE_ID } from 'constantz'

const createComponentBundle = ({
  baseName,
  session,
  declParamIds = [],
  invocationIds = [],
}) => {
  const { Name, Declaration, Invocation, File } = session

  /* names - for the new component bundle */
  const componentName = getNewComponentName(Name.all().ref(), pascalCase(baseName))
  const componentNameId = Name.create(componentName)
  const wrapperNameId = Name.create(`${componentName}Wrapper`)

  // NEW COMPONENT WRAPPER
  const wrapperDeclarationId = Declaration.create({
    nameId: wrapperNameId,
    type: STYLED_COMPONENT,
    tag: 'div',
  })

  // NEW COMPONENT
  let wrapperInvocationId

  const newComponentDeclarationId = Declaration.create({
    nameId: componentNameId,
    invocationIds: [
      (wrapperInvocationId = Invocation.create({
        nameId: wrapperNameId,
        source: null,
        invocationIds,
        declarationId: wrapperDeclarationId,
      })),
    ],
    declParamIds,
  })

  const directoryId = File.create({
    nameId: componentNameId,
    type: DIR,
    children: [
      File.create({ nameId: INDEX_NAME_ID, declarationIds: [newComponentDeclarationId] }),
      File.create({ nameId: wrapperNameId, type: SC, declarationIds: [wrapperDeclarationId] }),
    ],
  })

  File.withId(COMPONENTS_FILE_ID).children.insert(directoryId)

  // refresh session data
  orm.session({
    ...session.state,
  })


  return [
    componentNameId,
    newComponentDeclarationId,
    wrapperInvocationId,
  ]
}

export default createComponentBundle

const getNewComponentName = (names, baseName = 'NewComponent') => {
  let nextNameSuffix = null
  const checkName = nameId => names[nameId].value === `${baseName}${nextNameSuffix || ''}`
  while (Object.keys(names).find(checkName)) {
    nextNameSuffix += 1
  }
  return `${baseName}${nextNameSuffix || ''}`
}
