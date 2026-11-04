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

  test('... a new blog can be created', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('2025 LLM Year in Review'))
  })

  test('... a new blog can be created with 0 likes', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('... a new blog cannot be created if it misses title, author or url', async () => {
    for (const badBlog of helper.missingFieldsBlogs) {
      await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400)
    }

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})