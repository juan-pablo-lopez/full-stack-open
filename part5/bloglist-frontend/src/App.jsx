import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch {
      console.log('Incorrect credentials')
    }
  }

  const handleSignOut = async (event) => {
    event.preventDefault();

    setUsername('');
    setPassword('');
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
    setUser(null);

    window.localStorage.removeItem('loggedUser');
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
        console.log('New entry saved in Blog List.');
        setBlogs(blogs.concat(response));
        console.log(response);

        setTitle('');
        setAuthor('');
        setUrl('');
        setLikes('');
      })
      .catch(error => {
        console.log(error)
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
    </div>
  )
}

export default App