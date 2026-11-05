const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
blogsRouter.post('/', async (request, response) => {
  if (!request.token || !request.userId) {
    return response.status(401).json({ error: 'Invalid session.' })
  }

  const user = await User.findById(request.userId)
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
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)

    if (blog) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})


// PUT by Id
blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      const body = request.body

      blog.title = body.title
      blog.author = body.author
      blog.url = body.url
      blog.likes = body.likes

      const updatedBlog = await blog.save()
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
