import getTestDB from 'duck/getTestDB'
import {
  getCurrentFileDeclarations,
  getCurrentFileImports,
  getCurrentFileDefaultExport,
} from './'

const appState = {
  app: getTestDB(),
}

it('getCurrentFileDeclarations', () => {
  const declarations = getCurrentFileDeclarations(appState)
  expect(declarations[0].id).toEqual(1)
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
