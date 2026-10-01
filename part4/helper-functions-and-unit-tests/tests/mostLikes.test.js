const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const allBlogs = require('./data/allBlogs')

describe('Author with most likes', () => {
  test('of an empty list is {}', () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), {})
  })

  test('of a single item list is that author', () => {
    assert.deepStrictEqual(listHelper.mostLikes([allBlogs[0]]), {author: 'Martin Fowler', likes: 15})
  })

  test('of all blogs is Dan Abramov', () => {
    assert.deepStrictEqual(listHelper.mostLikes(allBlogs), {author: 'Dan Abramov', likes: 86})
  })
})
