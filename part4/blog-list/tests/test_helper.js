const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

/*********/
/* Blogs */
/*********/
const initialBlogs = (userId) => [
  {
    title: 'Microservices',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/articles/microservices.html',
    likes: 15,
    user: userId
  },
  {
    title: 'Things I Don\'t Know as of 2018',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
    likes: -12,
    user: userId
  },
  {
    title: 'How to Do Great Work',
    author: 'Paul Graham',
    url: 'http://paulgraham.com/greatwork.html',
    likes: 28,
    user: userId
  },
  {
    title: 'The AI Revolution: The Road to Superintelligence',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html',
    likes: 35,
    user: userId
  },
  {
    title: 'You Might Not Need Redux',
    author: 'Dan Abramov',
    url: 'https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367',
    likes: 98,
    user: userId
  },
  {
    title: 'What every software engineer should know about search',
    author: 'Maciej Cegłowski',
    url: 'https://idlewords.com/talks/what_every_software_engineer_should_know_about_search.htm',
    likes: 42,
    user: userId
  }
]

const newBlog = (userId) => ({
  title: '2025 LLM Year in Review',
  author: 'Andrej Karpathy',
  url: 'https://karpathy.bearblog.dev/year-in-review-2025/',
  likes: 2755,
  user: userId
})

const newBlogNoLikes = (userId) => ({
  title: 'PyTorch opens the AI ecosystem to a new class of accelerators',
  author: 'Peter Hess',
  url: 'https://research.ibm.com/blog/pytorch-spyre-accelerator-software-ecosystem-updates',
  user: userId
})

const missingFieldsBlogs = (userId) => [
  {
    author: 'Peter Hess',
    url: 'https://research.ibm.com/blog/pytorch-spyre-accelerator-software-ecosystem-updates',
    user: userId
  },
  {
    title: 'PyTorch opens the AI ecosystem to a new class of accelerators',
    author: 'Peter Hess',
    user: userId
  },
  {
    author: 'Peter Hess',
    user: userId
  },
  {
    user: userId
  },
  {
  }
]

const nonExistingBlogId = async (userId) => {
  const blog = new Blog(newBlog(userId))
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/*********/
/* Users */
/*********/
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const passwordHash = bcrypt.hashSync('This is root user password', 10)

const newPlainRootUser = {
  username: 'root',
  name: 'Administrator',
  password: 'This is root user password'
}

const newHashedRootUser = {
  username: 'root',
  name: 'Administrator',
  passwordHash
}

/***********/
/* Exports */
/***********/
module.exports = {
  initialBlogs, newBlog, newBlogNoLikes, missingFieldsBlogs, nonExistingBlogId, blogsInDb,
  usersInDb, newPlainRootUser, newHashedRootUser
}