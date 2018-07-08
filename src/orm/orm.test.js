import orm from './orm'
import Model, { attr, array } from './Model'

// tests
it('TModel', () => {
  orm.register(TestModel) // eslint-disable-line no-use-before-define
  const session = orm.session({ hi: 'hi' })
  const { TModel } = session

  let preState

  // hasId
  expect(TModel.hasId(1)).toBeFalsy()
  // create
  preState = session.state
  TModel.create({ text: 'text' })
  expect(session.state).toMatchObject({ tmodels: { 1: { id: 1, text: 'text' } }, hi: 'hi' })
  expect(session.state).not.toBe(preState)
  // hasId
  expect(TModel.hasId(1)).toBeTruthy()
  // all
  expect(TModel.all().ref()).toMatchObject({ 1: { id: 1, text: 'text' } })
  // withId
  expect(TModel.withId(1).ref()).toMatchObject({ id: 1, text: 'text' })
  // update
  preState = session.state
  TModel.withId(1).update({ text: 'hi' })
  expect(TModel.withId(1).ref()).toMatchObject({ id: 1, text: 'hi' })
  expect(session.state).not.toBe(preState)

  // array attribute insert
  preState = session.state
  TModel.withId(1).arrayAttr.insert(2)
  expect(TModel.withId(1).ref()).toMatchObject({ arrayAttr: [2] })
  expect(session.state).not.toBe(preState)

  // array attribute remove
  preState = session.state
  TModel.withId(1).arrayAttr.remove(2)
  expect(TModel.withId(1).ref()).toMatchObject({ arrayAttr: [] })
  expect(session.state).not.toBe(preState)

  // delete
  preState = session.state
  TModel.withId(1).delete()
  expect(TModel.hasId(1)).toBeFalsy()
  expect(session.state).not.toBe(preState)

  expect(session.state).toEqual({ tmodels: {}, hi: 'hi' })
})

/*
  TestModel
*/
class TestModel extends Model {}

TestModel.modelName = 'TModel'
TestModel.stateKey = 'tmodels'

TestModel.fields = {
  text: attr({ required: true }),
  arrayAttr: array(),
}

