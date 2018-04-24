import { required } from 'constantz'
import { getEntitiesAdder } from './helpers'

it('entityAdder can be called without args', () => {
  let addEntity
  expect(() => { addEntity = getEntitiesAdder() }).not.toThrowError()
  expect(() => addEntity({})).not.toThrowError()
})


it('entityAdder adds entity to entities', () => {
  const addCat = getEntitiesAdder({
    legs: 4,
    tail: 1,
    name: required,
  })

  const cat1 = {}
  const cats = { 1: cat1 }
  const [catsWithExtraCat, lastAddedId] = addCat(cats, { name: 'sally' })

  // not mutated
  expect(catsWithExtraCat).not.toEqual(cats)
  // prior entry still ==='s current
  expect(cats[0] === catsWithExtraCat[0]).toBeTruthy()
  // has added
  expect(Object.keys(catsWithExtraCat).length).toEqual(2)
  // has added with specified value
  expect(catsWithExtraCat[2].name).toEqual('sally')
  // cannot add without required value
  expect(() => addCat(cats, {})).toThrowError('name is a required field')
  // added with id 2
  expect(lastAddedId).toEqual(2)
})

it('entityAdder can add more than one entity to entities', () => {
  const addCat = getEntitiesAdder({
    legs: 4,
    tail: 1,
    name: required,
  })

  const cat1 = {}
  const cats = { 1: cat1 }
  const [catsWithExtraCat, sallyId, jimId] = addCat(cats, { name: 'sally' }, { name: 'jim' })

  // not mutated
  expect(catsWithExtraCat).not.toEqual(cats)
  // has added
  expect(Object.keys(catsWithExtraCat).length).toEqual(3)
  // has added with specified value
  expect(catsWithExtraCat[3].name).toEqual('jim')
  // added with id 3
  expect(jimId).toEqual(3)
})
