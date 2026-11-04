const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// GET all
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


// GET by Id
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

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
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
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
