import appReducer from './'
import getTestDB from './getTestDB'

const initialState = getTestDB()

it('initial state for tests', () => {
  const { names, files, expressions, invocations } = appReducer(initialState, {})
  expect(Object.keys(files).length).toEqual(4)
  expect(Object.keys(names).length).toEqual(7)
  expect(Object.keys(invocations).length).toEqual(3)
  expect(Object.keys(expressions).length).toEqual(4)
})
