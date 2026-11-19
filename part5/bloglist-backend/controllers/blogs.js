const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// GET all
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


// GET by Id
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog
      .findById(request.params.id).populate('user', { username: 1, name: 1 })

    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

// POST
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.token || !request.user) {
    return response.status(401).json({ error: 'Invalid session.' })
  }

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'Missing or invalid userId.' })
  }
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(savedBlog)
})


// DELETE by Id
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  if (!request.token || !request.user) {
    return response.status(401).json({ error: 'Invalid session.' })
  }

  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      if (blog.user.toString() === request.user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
      } else {
        return response.status(403).json({ error: 'Access to the requested operation is forbidden.' })
      }
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})


// PUT by Id
blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  if (!request.token || !request.user) {
    return response.status(401).json({ error: 'Invalid session.' })
  }

  try {
    const { title, author, url, likes } = request.body

    if (
      title === undefined ||
      author === undefined ||
      url === undefined ||
      likes === undefined
    ) {
      return response.status(400).json({
        error: 'PUT requires title, author, url, and likes.'
      })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).end()
    }

    if (blog.user.toString() !== request.user._id.toString()) {
      return response.status(403).json({
        error: 'Access to the requested operation is forbidden.'
      })
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()

    await updatedBlog.populate('user', { username: 1, name: 1 })

    return response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

// PATCH by Id
blogsRouter.patch('/:id', middleware.userExtractor, async (request, response, next) => {

  if (!request.token || !request.user) {
    return response.status(401).json({ error: 'Invalid session.' })
  }

  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      if (blog.user.toString() === request.user._id.toString()) {
        const body = request.body
        const allowedFields = ['title', 'author', 'url', 'likes']

        allowedFields.forEach(field => {
          if (Object.hasOwn(body, field)) {
            blog[field] = body[field]
          }
        })

        const updatedBlog = await blog.save()

        await updatedBlog.populate('user', { username: 1, name: 1 })
        response.json(updatedBlog)
      } else {
        return response.status(403).json({ error: 'Access to the requested operation is forbidden.' })
      }
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
