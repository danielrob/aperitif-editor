import { exportTypes } from 'constantz'

import getTestDB from '../getTestDB'
import {
  selectNames,
  getCurrentFileExpressions,
  getCurrentFileInvocations,
  getCurrentFileExpressionWithDefaultExport,
} from '../selectors'

const { DEFAULT } = exportTypes

const appState = {
  app: getTestDB(),
}

it('getCurrentFileExpressions', () => {
  const expressions = getCurrentFileExpressions(appState)
  expect(expressions[0].id).toEqual(1)
})

it('getCurrentFileInvocations', () => {
  const names = selectNames(appState)
  const invocations = getCurrentFileInvocations(appState)
  expect(names[invocations[0].importNameId]).toEqual('React')
  expect(invocations[0].source).toEqual('react')
})

it('getCurrentFileDefaultExport', () => {
  const defaultExportingExpression = getCurrentFileExpressionWithDefaultExport(appState)
  expect(defaultExportingExpression.exportType).toEqual(DEFAULT)
})
