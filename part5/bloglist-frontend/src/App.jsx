import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      return JSON.parse(loggedUserJSON)
    }

    return null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleSignIn = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user)) 

      setUser(user)
      setUsername('')
      setPassword('')

    } catch {
      console.log('Incorrect credentials')
    }
  }

  const handleSignOut = async (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem('loggedUser')
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

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          {user.name} is logged in! 
          <form onSubmit={handleSignOut}>
            <button type="submit">Sign out</button>
          </form>
          {blogsList()}
        </div>
      )}
    </div>
  )
}

export default App