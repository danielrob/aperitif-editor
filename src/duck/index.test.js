import getTestDB from './getTestDB'
import appReducer, { moveParamToSpread } from './'

const initialState = getTestDB()

it('initial state for tests', () => {
  const { names, files, declarations, invocations } = appReducer(initialState, {})
  expect(Object.keys(files).length).toBe(6)
  expect(Object.keys(names).length).toBe(17)
  expect(Object.keys(invocations).length).toBe(4)
  expect(Object.keys(declarations).length).toBe(4)
})

