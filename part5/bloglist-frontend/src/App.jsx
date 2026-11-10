import { useState, useRef, useEffect } from 'react'
import BlogList from './components/BlogList'
import { Notification } from './components/Notification';
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable';
import AddBlogForm from './components/AddBlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      blogService.setToken(currentUser.token)
      return currentUser
    }
    return null
  })
  const [notification, setNotification] = useState('');

  const addBlogFormRef = useRef();

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (error) {
        console.error('Failed to load blogs:', error)
      }
    }

    fetchBlogs()
  }, [user])

  const messageObject = (intro, details) => {
    return {
      intro: intro,
      details: details
    }
  }

  const handleSignIn = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)

      setUsername('')
      setPassword('')

      setNotification({'message': messageObject(`Welcome ${user.name}!`, ['Loading blog entries.']), 'type':'info'});
      setTimeout(() => {setNotification({'message': null, 'type': null})}, 2500);
    } catch {
      setNotification({'message': messageObject('Credentials are incorrect!', ['Please try again.']), 'type':'error'});
      setTimeout(() => {setNotification({'message': null, 'type': null})}, 2500);
    }
  }

  const handleSignOut = async (event) => {
    event.preventDefault();

    setNotification({'message': messageObject(`Goodbye ${user.name}!`, null), 'type':'info'});
    setTimeout(() => {setNotification({'message': null, 'type': null})}, 1500);

    blogService.setToken(null)
    setUsername('');
    setPassword('');
    setUser(null);
    setBlogs([]);

    window.localStorage.removeItem('loggedUser');
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

      setNotification({'message': messageObject(`Blog '${likedBlog.title}' liked!`, null), 'type':'success'});
      setTimeout(() => {setNotification({'message': null, 'type': null})}, 1000);
    } catch {
      setNotification({'message': messageObject('Error trying to like a blog', ['Please try again.']), 'type':'error'});
      setTimeout(() => {setNotification({'message': null, 'type': null})}, 1500);
    }
  }

  const removeBlog = async (blogToRemove) => {
    if (!window.confirm(`Remove '${blogToRemove.title}' entry?`)) {
      return;
    }

    try {
      await blogService.remove(blogToRemove.id);
      setBlogs(previousBlogs =>
        previousBlogs.filter(b => b.id !== blogToRemove.id)
      )

      setNotification({'message': messageObject(`Blog '${blogToRemove.title}' removed!`, null), 'type':'success'});
      setTimeout(() => {setNotification({'message': null, 'type': null})}, 1000);
    } catch {
      setNotification({'message': `An error happened while removing entry for ${blogToRemove.title}.`, 'type':'error'});
      setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
    }  
  };

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
        addBlogFormRef.current.toggleVisibility();
        setNotification({'message': messageObject('New entry created for:',[`Title: ${blog.title}`, `Author: ${blog.author}`]), 'type':'success'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 2500);
        setBlogs(blogs.concat(response));
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

        setNotification({'message': message, 'type':'error'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 5000);
      });
  }

  const loginForm = () => (
    <form onSubmit={handleSignIn}>
      <div>
        <label>
          User 
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Sign in</button>
    </form>
  )

  const addBlogForm = () => (
    <Togglable buttonLabel='Add Blog Entry' ref={addBlogFormRef}>
      <AddBlogForm createBlogEntry={createBlogEntry} />
    </Togglable>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          {user.name} is logged in!
          <form onSubmit={handleSignOut}>
            <button type="submit">Sign out</button>
          </form>
          <hr />
          {addBlogForm()}
          <hr />
          <BlogList blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} />
        </div>
      )}
      <Notification message={notification['message']} type={notification['type']} />
    </div>
  )
}

export default App