const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const allBlogs = [
  {
    "title": "Microservices",
    "author": "Martin Fowler",
    "url": "https://martinfowler.com/articles/microservices.html",
    "likes": 15,
    "id": "6abacbf6bbc5d0d320cb7a26"
  },
  {
    "title": "Things I Don't Know as of 2018",
    "author": "Dan Abramov",
    "url": "https://overreacted.io/things-i-dont-know-as-of-2018/",
    "likes": -12,
    "id": "6abacc0dbbc5d0d320cb7a27"
  },
  {
    "title": "How to Do Great Work",
    "author": "Paul Graham",
    "url": "http://paulgraham.com/greatwork.html",
    "likes": 28,
    "id": "6abacc1ebbc5d0d320cb7a28"
  },
  {
    "title": "The AI Revolution: The Road to Superintelligence",
    "author": "Tim Urban",
    "url": "https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html",
    "likes": 35,
    "id": "6abacc30bbc5d0d320cb7a29"
  },
  {
    "title": "You Might Not Need Redux",
    "author": "Dan Abramov",
    "url": "https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367",
    "likes": 98,
    "id": "6abacc41bbc5d0d320cb7a2a"
  },
  {
    "title": "What every software engineer should know about search",
    "author": "Maciej Cegłowski",
    "url": "https://idlewords.com/talks/what_every_software_engineer_should_know_about_search.htm",
    "likes": 42,
    "id": "6abae134ba1f5d964aec42a2"
  }
]

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
