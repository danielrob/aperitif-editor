import { addNames, update, updateAtKey, insertAt, insertAtKey } from './'

it('addName adds name to names', () => {
  const names = { 1: 'index', 2: 'app' }
  const nextName = 'hello'
  const expectedId = 3
  const [nextNames, newId] = addNames(names, nextName)

  expect(nextNames).not.toEqual(names)
  expect(expectedId).toEqual(newId)
  expect(nextNames[newId]).toEqual(nextName)
})

it('update updates entity with value in entities', () => {
  const cats = { 1: {}, 2: {}, 3: {} }

  const betterCats = update(cats, 2, { legs: 4 })
  // not mutated
  expect(cats).not.toEqual(betterCats)
  // is updated
  expect(betterCats[2].legs).toEqual(4)
})


it('update updates entity via function in entities', () => {
  const cats = { 1: {}, 2: {}, 3: {} }

  const betterCats = update(cats, 2, cat => ({ ...cat, legs: 4 }))
  // not mutated
  expect(cats).not.toEqual(betterCats)
  // is updated
  expect(betterCats[2].legs).toEqual(4)
})

it('updateAtKey updates an entities key', () => {
  const cats = { 1: {}, 2: { hi: 'bonjour' }, 3: {} }

  const betterCats = updateAtKey(cats, 2, 'hi', 'hello')
  // not mutated
  expect(cats).not.toEqual(betterCats)
  // is updated
  expect(betterCats[2].hi).toEqual('hello')
})

it('insertAt inserts element to array', () => {
  const cats = [1, 2, 3, 4, 5]
  const newCat = 'newCat'

  const moreCats = insertAt(cats, newCat, 2)

  // not mutated
  expect(cats).not.toEqual(moreCats)
  // is updated
  expect(moreCats[2]).toEqual(newCat)
  // is correct
  expect(moreCats).toEqual([1, 2, newCat, 3, 4, 5])
})


it('can combine update with insertAtKey', () => {
  const cats = { 1: {}, 2: { children: [1, 2, 3] } }
  const catGivingBirth = 2
  const insertKittenPosition = 3
  const newKitten = 4

  const givesBirth = cat => insertAtKey(cat, 'children', newKitten, insertKittenPosition)
  const catsAfterCatGivesBirth = update(cats, catGivingBirth, givesBirth)

  // not mutated
  expect(cats).not.toEqual(catsAfterCatGivesBirth)
  // is updated
  expect(catsAfterCatGivesBirth[catGivingBirth].children[insertKittenPosition]).toEqual(newKitten)
})
