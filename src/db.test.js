import { addName } from './db'

it('addName adds name to names', () => {
  const names = { 1: 'index', 2: 'app' }
  const nextName = 'hello'
  const expectedId = 3
  const [nextNames, newId] = addName(names, nextName)

  expect(nextNames).not.toEqual(names)
  expect(expectedId).toEqual(newId)
  expect(nextNames[newId]).toEqual(nextName)
})
