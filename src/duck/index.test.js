import getTestDB from './getTestDB'
import appReducer, {
  moveParamToSpread,
} from './'

const initialState = getTestDB()

it('initial state for tests', () => {
  const { names, files, expressions, invocations } = appReducer(initialState, {})
  expect(Object.keys(files).length).toBe(4)
  expect(Object.keys(names).length).toBe(7)
  expect(Object.keys(invocations).length).toBe(3)
  expect(Object.keys(expressions).length).toBe(4)
})


it('responds to the moveParamToSpread action', () => {
  const previousState = {
    expressions: {
      1: {
        paramIds: [2],
        spreadParamIds: [],
      },
    },
  }
  const action = moveParamToSpread({ expressionId: 1, paramId: 2 })
  const newState = appReducer(previousState, action)
  expect(newState).not.toBe(initialState)
  expect(newState.expressions).not.toBe(initialState.expressions)

  const updatedExpression = newState.expressions[1]
  expect(updatedExpression.paramIds).toHaveLength(0)
  expect(updatedExpression.spreadParamIds).toHaveLength(1)
})
