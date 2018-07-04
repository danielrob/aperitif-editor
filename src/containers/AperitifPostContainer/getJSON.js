import C from 'check-types'

export default function getJSON(value) {
  let json
  let error
  // try JSON.parse
  try {
    json = JSON.parse(value)
  } catch (e) {
    error = `${e.message}` // JSON.parse error
  }
  // try eval
  try {
    json = JSON.parse(JSON.stringify(eval(`(${value})`))) // eslint-disable-line no-eval
  } catch (e) {
    // do nothing. If eval worked then the parsing will work, if not too bad.
  }

  if (json) {
    if (C.object(json) || C.array.of.object(json)) {
      return { json }
    }
    error = 'The response shape must be an array of objects or an object'
  }
  return { error }
}
