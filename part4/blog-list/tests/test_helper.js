const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Microservices',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/articles/microservices.html',
    likes: 15
  },
  {
    title: 'Things I Don\'t Know as of 2018',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
    likes: -12
  },
  {
    title: 'How to Do Great Work',
    author: 'Paul Graham',
    url: 'http://paulgraham.com/greatwork.html',
    likes: 28
  },
  {
    title: 'The AI Revolution: The Road to Superintelligence',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html',
    likes: 35
  },
  {
    title: 'You Might Not Need Redux',
    author: 'Dan Abramov',
    url: 'https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367',
    likes: 98
  },
  {
    title: 'What every software engineer should know about search',
    author: 'Maciej Cegłowski',
    url: 'https://idlewords.com/talks/what_every_software_engineer_should_know_about_search.htm',
    likes: 42
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'To be removed' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}