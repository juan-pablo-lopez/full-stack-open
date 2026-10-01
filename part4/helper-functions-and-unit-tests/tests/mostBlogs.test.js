const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const allBlogs = require('./data/allBlogs')

describe('Author with most blogs', () => {
  test('of an empty list is {}', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {})
  })

  test('of a single item list is that author', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([allBlogs[0]]), {author: 'Martin Fowler', blogs: 1})
  })

  test('of all blogs is Dan Abramov', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(allBlogs), {author: 'Dan Abramov', blogs: 2})
  })
})
