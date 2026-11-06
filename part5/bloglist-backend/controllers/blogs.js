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
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      if (blog.user.toString() === request.user._id.toString()) {
        const body = request.body

        blog.title = body.title
        blog.author = body.author
        blog.url = body.url
        blog.likes = body.likes

        const updatedBlog = await blog.save()
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
