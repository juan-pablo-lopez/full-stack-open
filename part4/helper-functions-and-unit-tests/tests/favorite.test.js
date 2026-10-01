const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const allBlogs = require('./data/allBlogs')

describe('Favorite Blog', () => {
  test('of an empty list is null', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), null)
  })

  test('of a list with one item is that single item', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([allBlogs[0]]), allBlogs[0])
  })

  test('of a list with one item with negative likes is that single item', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([allBlogs[1]]), allBlogs[1])
  })

  test('of all blogs is the one with 98 likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(allBlogs), allBlogs[4])
  })
})
