import { required, getEntityAdder, updateEntity, insertAt, insertAtKey } from './helpers'

it('entityAdder can be called without args', () => {
  let addEntity
  expect(() => { addEntity = getEntityAdder() }).not.toThrowError()
  expect(() => addEntity({})).not.toThrowError()
})


it('entityAdder adds entity to entities', () => {
  const addCat = getEntityAdder({
    legs: 4,
    tail: 1,
    name: required,
  })

  const cat1 = {}
  const cats = { 1: cat1 }
  const [catsWithExtraCat, lastAddedId] = addCat(cats, { name: 'sally' })

  // not mutated
  expect(catsWithExtraCat).not.toEqual(cats)
  // has added
  expect(Object.keys(catsWithExtraCat).length).toEqual(2)
  // has added with specified value
  expect(catsWithExtraCat[2].name).toEqual('sally')
  // cannot add without required value
  expect(() => addCat(cats, {})).toThrowError('name is a required field')
  // added with id 2
  expect(lastAddedId).toEqual(2)
})


it('updateEntity updates entity with value in entities', () => {
  const cats = { 1: {}, 2: {}, 3: {} }

  const betterCats = updateEntity(cats, 2, { legs: 4 })
  // not mutated
  expect(cats).not.toEqual(betterCats)
  // is updated
  expect(betterCats[2].legs).toEqual(4)
})


it('updateEntity updates entity via function in entities', () => {
  const cats = { 1: {}, 2: {}, 3: {} }

  const betterCats = updateEntity(cats, 2, cat => ({ ...cat, legs: 4 }))
  // not mutated
  expect(cats).not.toEqual(betterCats)
  // is updated
  expect(betterCats[2].legs).toEqual(4)
})


it('insertAt inserts element to array', () => {
  const cats = [1, 2, 3, 4, 5]
  const newCat = 'newCat'

  const moreCats = insertAt(cats, 2, newCat)

  // not mutated
  expect(cats).not.toEqual(moreCats)
  // is updated
  expect(moreCats[2]).toEqual(newCat)
  // is correct
  expect(moreCats).toEqual([1, 2, newCat, 3, 4, 5])
})


it('can combine updateEntity with insertAtKey', () => {
  const cats = { 1: {}, 2: { children: [1, 2, 3] } }
  const catGivingBirth = 2
  const insertKittenPosition = 3
  const newKitten = 4

  const givesBirth = cat => insertAtKey(cat, 'children', insertKittenPosition, newKitten)
  const catsAfterCatGivesBirth = updateEntity(cats, catGivingBirth, givesBirth)

  // not mutated
  expect(cats).not.toEqual(catsAfterCatGivesBirth)
  // is updated
  expect(catsAfterCatGivesBirth[catGivingBirth].children[insertKittenPosition]).toEqual(newKitten)
})
