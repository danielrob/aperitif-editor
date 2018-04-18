import { addNames, addFiles, addImports, addExports, addExpressions } from 'db'
import { fileTypes } from 'constantz'

import appReducer from '../duck'

const { DIR } = fileTypes

// initial state setup for testing
const [initialNames, indexNameId, appDirId, appIndexId] = addNames({}, 'index', 'App', 'index')
const [initialImports, reactImportId] = addImports({}, { default: 'React', fromModule: 'react' })
const [initialExports, appExportId] = addExports({}, {})

const expression = { nameId: appDirId, importIds: [reactImportId], exportIds: [appExportId] }
const [initialExpressions, expressionId] = addExpressions({}, expression)

const indexFile = { nameId: indexNameId, expressionIds: [] }
const appFile = { nameId: appIndexId, expressionIds: [expressionId] }
const [initialFiles, appFileId] = addFiles({}, appFile, indexFile)

const appDir = { nameId: appDirId, type: DIR, children: [appFileId] }
const [initialFilesAndDirs] = addFiles(initialFiles, appDir)

const initialState = {
  names: initialNames,
  files: initialFilesAndDirs,
  imports: initialImports,
  exports: initialExports,
  expressions: initialExpressions,
}

it('initial state for tests', () => {
  const { names, files, imports, exports, expressions } = appReducer(initialState, {})

  expect(Object.keys(names).length).toEqual(3)
  expect(Object.keys(files).length).toEqual(3)
  expect(Object.keys(imports).length).toEqual(1)
  expect(Object.keys(exports).length).toEqual(1)
  expect(Object.keys(expressions).length).toEqual(1)

  expect(files[1].expressionIds[0]).toEqual(1)

  expect(expressions[1].nameId).toEqual(2)
  expect(expressions[1].importIds[0]).toEqual(1)
  expect(expressions[1].exportIds[0]).toEqual(1)
})
