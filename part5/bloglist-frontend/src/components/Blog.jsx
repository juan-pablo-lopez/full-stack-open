import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Blog = ({ blogs, likeBlog, removeBlog }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return (
      <div className='blog-details'>
        <h2>Blog Details</h2>
        <div>
          <span className='title'>Blog not found!</span>
        </div>
      </div>
    )
  }

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const currentUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  const decoded = currentUser ? jwtDecode(currentUser.token) : null
  const createdByCurrentUser = Boolean(
    decoded?.id &&
    decoded?.username &&
    blog.user.id === decoded.id &&
    blog.user.username === decoded.username
  )

  const increaseLikes = (event) => {
    event.preventDefault()

    likeBlog(blog)
  }

  const handleRemoveBlog = (event) => {
    event.preventDefault()

    removeBlog(blog)
  }

  return (
    <>
      <h2>Blog Details</h2>
      <div className='blog-details'>
        <div>
          <span className='title'>{blog.title}</span> (<span className='author'>{blog.author}</span>)
        </div>
        <div className='info'>
          <div>URL: <a href={blog.url} target='_blank'>{blog.url}</a></div>
          <div>Likes: {blog.likes} {decoded && (
            <button onClick={increaseLikes}>Like</button>
          )}
          </div>
          <div>Entry added by: {blog.user.name} &nbsp;
            {createdByCurrentUser && (
              <button onClick={handleRemoveBlog}>Remove</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog