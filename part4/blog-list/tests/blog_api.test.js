const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('All Blogs', () => {
  test('... are returned as JSON (6 entries)', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, 6)
  })

  test('... "id" property does exist and "_id" does not exist', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert.notStrictEqual(blog.id, undefined, `Blog missing 'id': ${JSON.stringify(blog)}`)
      assert.strictEqual(blog._id, undefined, `Blog still has '_id': ${JSON.stringify(blog)}`)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})