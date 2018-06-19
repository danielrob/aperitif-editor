/* eslint-disable prefer-const */
import orm from 'orm'
import { capitalize } from 'utils'
import { DIR, SC, STYLED_COMPONENT } from 'constantz'

const createComponentBundle = ({
  baseName,
  session,
  declParamIds = [],
  invocationIds = [],
}) => {
  const { Name, Declaration, Invocation, File } = session

  /* names - for the new component bundle */
  const componentName = getNewComponentName(Name.all().ref(), capitalize(baseName))
  const componentNameId = Name.create(componentName)
  const indexNameId = Name.create('index')
  const wrapperNameId = Name.create(`${componentName}Wrapper`)

  // NEW COMPONENT WRAPPER
  const wrapperDeclarationId = Declaration.create({
    nameId: wrapperNameId,
    type: STYLED_COMPONENT,
    tag: 'div',
  })

  // NEW COMPONENT
  const newComponentDeclarationId = Declaration.create({
    nameId: componentNameId,
    invocationIds: [
      Invocation.create({
        nameId: wrapperNameId,
        source: null,
        invocationIds,
        closed: !invocationIds.length,
        declarationId: wrapperDeclarationId,
      }),
    ],
    declParamIds,
  })

  const directoryId = File.create({
    nameId: componentNameId,
    type: DIR,
    children: [
      File.create({ nameId: indexNameId, declarationIds: [newComponentDeclarationId] }),
      File.create({ nameId: wrapperNameId, type: SC, declarationIds: [wrapperDeclarationId] }),
    ],
  })

  File.withId(session.state.editor.rootFiles[0]).children.insert(directoryId)

  // refresh session data
  orm.session({
    ...session.state,
  })


  return [
    componentNameId,
    newComponentDeclarationId,
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
