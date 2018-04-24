import { DEFAULT } from 'constantz'
import getTestDB from 'duck/getTestDB'
import {
  selectNames,
  getCurrentFileExpressions,
  getCurrentFileImports,
  getCurrentFileDefaultExport,
} from 'selectors'

const appState = {
  app: getTestDB(),
}

it('getCurrentFileExpressions', () => {
  const expressions = getCurrentFileExpressions(appState)
  expect(expressions[0].id).toEqual(1)
})

it('getCurrentFileImports', () => {
  const imports = getCurrentFileImports(appState)
  expect(imports.length).toEqual(2)
  expect(imports[0].importName).toEqual('React')
  expect(imports[0].source).toEqual('react')
})

it('getCurrentFileDefaultExport', () => {
  const defualtExportName = getCurrentFileDefaultExport(appState)
  expect(defualtExportName).toEqual('App')
})
