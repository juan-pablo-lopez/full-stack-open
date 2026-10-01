const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const allBlogs = require('./data/allBlogs')

describe('Total Likes', () => {
  test('of an empty list is 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of first blog is 15', () => {
    assert.strictEqual(listHelper.totalLikes([allBlogs[0]]), 15)
  })

  test('of negative likes is -12', () => {
    assert.strictEqual(listHelper.totalLikes([allBlogs[1]]), -12)
  })

  test('of all blogs is 206', () => {
    assert.strictEqual(listHelper.totalLikes(allBlogs), 206)
  })
})
