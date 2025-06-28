/* global describe, it, afterEach */
const fs = require('fs')
const path = require('path')
const assert = require('assert')
const jsonfile = require('../index')

const file = path.join(__dirname, 'test-append.json')

describe('appendToFileSync', () => {
  afterEach(() => {
    if (fs.existsSync(file)) fs.unlinkSync(file)
  })

  it('should append data to an existing JSON file', () => {
    fs.writeFileSync(file, JSON.stringify({ a: 1 }), 'utf8')
    jsonfile.appendToFileSync(file, { b: 2 })

    const result = JSON.parse(fs.readFileSync(file, 'utf8'))
    assert.deepStrictEqual(result, { a: 1, b: 2 })
  })

  it('should create file if it does not exist', () => {
    jsonfile.appendToFileSync(file, { foo: 'bar' })

    const result = JSON.parse(fs.readFileSync(file, 'utf8'))
    assert.deepStrictEqual(result, { foo: 'bar' })
  })
})
