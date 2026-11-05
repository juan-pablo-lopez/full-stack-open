const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

// This is needed to be able to pass the user that creates blogs to every test
let rootUserId

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User(helper.newHashedRootUser)
  const rootUser = await user.save()

  rootUserId = rootUser.id

  await Blog.insertMany(helper.initialBlogs(rootUserId))
})

describe('Blogs ...', () => {
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
      .send(helper.newBlog(rootUserId))
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs(rootUserId).length + 1)
    assert(titles.includes('2025 LLM Year in Review'))
  })

  test('... a new blog can be created with 0 likes', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.newBlogNoLikes(rootUserId))
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('... a new blog cannot be created if it misses title, author or url', async () => {
    for (const badBlog of helper.missingFieldsBlogs(rootUserId)) {
      await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400)
    }

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs(rootUserId).length)
  })

  test('... a single blog can be retrieved using its id', async () => {
    const postResponse = await api
      .post('/api/blogs')
      .send(helper.newBlog(rootUserId))
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const id = postResponse.body.id
    const getResponse = await api.get(`/api/blogs/${id}`)

    assert.strictEqual(getResponse.body.title, helper.newBlog(rootUserId).title)
  })

  test('... requesting a nonexistent blog by its id returns 404', async () => {
    const id = await helper.nonExistingBlogId(rootUserId)
    await api
      .get(`/api/blogs/${id}`)
      .expect(404)
  })

  test('... a single blog can be deleted using its id', async () => {
    const postResponse = await api
      .post('/api/blogs')
      .send(helper.newBlog(rootUserId))
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const id = postResponse.body.id
    await api.delete(`/api/blogs/${id}`)

    await api
      .get(`/api/blogs/${id}`)
      .expect(404)
  })

  test('... requesting to delete a nonexistent blog by its id returns 404', async () => {
    const id = await helper.nonExistingBlogId(rootUserId)
    await api
      .delete(`/api/blogs/${id}`)
      .expect(404)
  })

  test('... a single blog can be updated using its id', async () => {
    const postResponse = await api
      .post('/api/blogs')
      .send(helper.newBlog(rootUserId))
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(postResponse.body.likes, helper.newBlog(rootUserId).likes)
    const updatedBlogPayload = {
      title: postResponse.body.title,
      author: postResponse.body.author,
      url: postResponse.body.url,
      likes: postResponse.body.likes + 1,
      user: postResponse.body.user
    }

    const putResponse = await api
      .put(`/api/blogs/${postResponse.body.id}`)
      .send(updatedBlogPayload)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(putResponse.body.likes, postResponse.body.likes + 1)
  })

  test('... requesting to update a nonexistent blog by its id returns 404', async () => {
    const id = await helper.nonExistingBlogId(rootUserId)

    const updatedBlogPayload = {
      title: helper.newBlog.title,
      author: helper.newBlog.author,
      url: helper.newBlog.url,
      likes: helper.newBlog.likes + 1,
      user: rootUserId
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlogPayload)
      .expect(404)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})