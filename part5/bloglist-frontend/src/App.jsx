import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('step 1')
      const user = await loginService.login({ username, password })
      console.log('step 2')
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
      console.log('step 3')
    } catch {
      console.log('Incorrect credentials')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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
      <button type="submit">login</button>
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
          <p>{user.name} logged in</p>
          {blogsList()}
        </div>
      )}
    </div>
  )
}

export default App