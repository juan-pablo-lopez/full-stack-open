import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification';
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlogFormRef = useRef()

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

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
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
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
    setUser(null);

    window.localStorage.removeItem('loggedUser');
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

  const handleCreateBlog = async(event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
      likes: likes
    };

    blogService
      .post(blog)
      .then(response => {
        addBlogFormRef.current.toggleVisibility();
        console.log('New entry saved in Blog List.');

        setNotification({'message': messageObject('New entry created for:',[`Title: ${title}`, `Author: ${author}`]), 'type':'success'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 2500);

        setBlogs(blogs.concat(response));
        console.log(response);

        setTitle('');
        setAuthor('');
        setUrl('');
        setLikes('');
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

  const blogsList = () => (
    <>
      <h2>Existing Blog Links</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const addBlogForm = () => (
    <Togglable buttonLabel='Add Blog Entry' ref={addBlogFormRef}>
      <form onSubmit={handleCreateBlog}>
        <h2>Add Blog Entry</h2>
        <div>
          <label>
            Title 
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Likes
            <input
              type="text"
              value={likes}
              onChange={({ target }) => setLikes(target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
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
          {blogsList()}
        </div>
      )}
      <Notification message={notification['message']} type={notification['type']} />
    </div>
  )
}

export default App