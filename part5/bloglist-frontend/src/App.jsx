import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

import blogService from './services/blogs'
import loginService from './services/login'

import Home from './components/Home'
import Footer from './components/Footer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import SignInForm from './components/SignInForm'
import SignOutButton from './components/SignOutButton'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      blogService.setToken(currentUser.token)
      return currentUser
    }
    return null
  })
  const [notification, setNotification] = useState('')
  const [blogs, setBlogs] = useState([])

  const messageObject = (intro, details) => {
    return {
      intro: intro,
      details: details
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setNotification({ 'message': messageObject('Loading existing blogs, please wait.', null), 'type':'info' })

        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (error) {
        console.error('Failed to load blogs:', error)
        setNotification({ 'message': messageObject('Failed to load blogs, please try again.', null), 'type':'error' })
        setBlogs([])
      } finally {
        setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 100)
      }
    }

    fetchBlogs()
  }, [])

  const handleSignIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)

      setNotification({ 'message': messageObject(`Welcome ${user.name}!`, null), 'type':'info' })
      setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 2500)
    } catch {
      setNotification({ 'message': messageObject('Credentials are incorrect!', ['Please try again.']), 'type':'error' })
      setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 2500)
    }
  }

  const handleSignOut = () => {
    setNotification({ 'message': messageObject(`Goodbye ${user.name}!`, null), 'type':'info' })
    setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 2500)

    blogService.setToken(null)
    setUser(null)

    window.localStorage.removeItem('loggedUser')
  }

  const likeBlog = async (likedBlog) => {
    try {
      const updatedBlog = await blogService.increaseLike(
        likedBlog.id,
        { likes: likedBlog.likes + 1 }
      )

      setBlogs(previousBlogs =>
        previousBlogs.map(blog =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      )

      setNotification({ 'message': messageObject(`Blog '${likedBlog.title}' liked!`, null), 'type':'success' })
      setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 1000)
    } catch {
      setNotification({ 'message': messageObject('Error trying to like a blog', ['Please try again.']), 'type':'error' })
      setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 1500)
    }
  }

  const removeBlog = async (blogToRemove) => {
    if (!window.confirm(`Remove '${blogToRemove.title}' entry?`)) {
      return
    }

    try {
      await blogService.remove(blogToRemove.id)
      setBlogs(previousBlogs =>
        previousBlogs.filter(b => b.id !== blogToRemove.id)
      )

      setNotification({ 'message': messageObject(`Blog '${blogToRemove.title}' removed!`, null), 'type':'success' })
      setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 1000)
    } catch {
      setNotification({ 'message': `An error happened while removing entry for ${blogToRemove.title}.`, 'type':'error' })
      setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 3500)
    }
  }

  const formatError = (error) => {
    // Required field
    let match = error.match(/^Path `(.+)` is required\.$/)

    if (match) {
      return `${capitalize(match[1])} is required`
    }

    // Minimum length
    match = error.match(
      /^Path `(.+)` \(`.*`, length \d+\) is shorter than the minimum allowed length \((\d+)\)\.$/
    )

    if (match) {
      return `${capitalize(match[1])} must have at least ${match[2]} characters`
    }

    // Unknown error: return original message
    return error
  }

  const capitalize = (text) => {
    if (text.toLowerCase() === 'url') return 'URL'

    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const createBlogEntry = (blog) => {
    blogService
      .post(blog)
      .then(response => {
        setNotification({ 'message': messageObject('New entry created for:',[`Title: ${blog.title}`, `Author: ${blog.author}`]), 'type':'success' })
        setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 2500)
        setBlogs(previousBlogs => previousBlogs.concat(response))
      })
      .catch(error => {
        const errors = error.response?.data?.error

        const message = Array.isArray(errors)
          ? {
            intro: 'An error happened when trying to create this blog entry.',
            details: errors.map(formatError)
          }
          : {
            intro: error.response?.data?.error || 'An unexpected error occurred.',
            details: []
          }

        setNotification({ 'message': message, 'type':'error' })
        setTimeout(() => {setNotification({ 'message': null, 'type': null })}, 5000)
      })
  }

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: 'inherit', textDecoration: 'none', mr: 3 }}
            >
              Bloglist Application
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Button color="inherit" component={Link} to="/blogs">
              Blogs
            </Button>

            {user && (
              <Button color="inherit" component={Link} to="/create">
                New Blog
              </Button>
            )}

            {!user && (
              <Button color="inherit" component={Link} to="/login">
                Sign In
              </Button>
            )}

            {user && <SignOutButton handleSignOut={handleSignOut} />}
          </Toolbar>
        </AppBar>

        <Notification message={notification['message']} type={notification['type']} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList blogs={blogs} />} />
          <Route
            path="/blogs/:id"
            element={<Blog blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} />}
          />
          <Route
            path="/create"
            element={<AddBlogForm createBlogEntry={createBlogEntry} />}
          />
          <Route path="/login" element={<SignInForm onSignIn={handleSignIn} />} />
        </Routes>

        <Footer />
      </Router>
    </Container>
  )
}

export default App