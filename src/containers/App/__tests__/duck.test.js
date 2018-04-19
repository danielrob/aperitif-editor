import appReducer from '../duck'
import getTestDB from '../getTestDB'

const initialState = getTestDB()

it('initial state for tests', () => {
  const { names, files, expressions, invocations } = appReducer(initialState, {})
  expect(Object.keys(names).length).toEqual(5)
  expect(Object.keys(expressions).length).toEqual(2)
})
