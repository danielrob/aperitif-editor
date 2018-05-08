import { addParams } from 'model-utils'
import getTestDB from './getTestDB'
import appReducer, { moveParamToSpread } from './'

const initialState = getTestDB()

it('initial state for tests', () => {
  const { names, files, expressions, invocations } = appReducer(initialState, {})
  expect(Object.keys(files).length).toBe(4)
  expect(Object.keys(names).length).toBe(8)
  expect(Object.keys(invocations).length).toBe(4)
  expect(Object.keys(expressions).length).toBe(4)
})

it('moveParamToSpread sets isSpreadMember flag to true', () => {
  const previousState = { params: addParams({}, { name: 'a' })  }
  const newState = appReducer(previousState, moveParamToSpread({ paramId: 1 }))

  expect(newState).not.toBe(initialState)
  expect(newState.params).not.toBe(initialState.params)

  expect(newState.params[1].isSpreadMember).toBeTruthy()
})
