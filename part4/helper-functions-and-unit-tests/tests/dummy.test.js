const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const allBlogs = require('./data/allBlogs')

describe("Dummy", () => {
  test('of an empty list is 1', () => {
    assert.strictEqual(listHelper.dummy([]), 1)
  })

  test('of first blog is 1', () => {
    assert.strictEqual(listHelper.totalLikes([allBlogs[0]]), 15)
  })

  test('of negative likes is 1', () => {
    assert.strictEqual(listHelper.totalLikes([allBlogs[1]]), -12)
  })

  test('of all blogs is 1', () => {
    assert.strictEqual(listHelper.totalLikes(allBlogs), 206)
  })

})
