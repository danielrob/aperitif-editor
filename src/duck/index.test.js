import { addDeclParams } from 'model-utils'
import getTestDB from './getTestDB'
import appReducer, { moveParamToSpread } from './'

const initialState = getTestDB()

it('initial state for tests', () => {
  const { names, files, declarations, invocations } = appReducer(initialState, {})
  expect(Object.keys(files).length).toBe(4)
  expect(Object.keys(names).length).toBe(14)
  expect(Object.keys(invocations).length).toBe(3)
  expect(Object.keys(declarations).length).toBe(2)
})

it('moveParamToSpread sets isSpreadMember flag to true', () => {
  const previousState = { params: addDeclParams({}, { nameId: 'a' }) }
  const newState = appReducer(previousState, moveParamToSpread({ paramId: 1 }))

  expect(newState).not.toBe(initialState)
  expect(newState.params).not.toBe(initialState.params)

  expect(newState.params[1].isSpreadMember).toBeTruthy()
})
