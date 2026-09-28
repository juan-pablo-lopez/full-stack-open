const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// GET all
blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((error) => {
      next(error)
    })
})


// GET by Id
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).json({
          error: `Record with id ${request.params.id} was not found.`
        })
      }
    })
    .catch((error) => {
      next(error)
    })
})


// POST
blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog)
    })
    .catch((error) => {
      next(error)
    })
})


// DELETE by Id
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).json({
          error: `Record with id ${request.params.id} was not found.`
        })
      }
      response.status(204).json(blog)
    })
    .catch((error) => {
      next(error)
    })
})


// PUT by Id
blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).json({
          error: `Record with id ${request.params.id} was not found.`
        })
      }

      blog.title = body.title
      blog.author = body.author
      blog.url = body.author
      blog.likes = body.likes

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = blogsRouter
