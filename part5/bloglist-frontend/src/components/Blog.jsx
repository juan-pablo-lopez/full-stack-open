import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [createdByCurrentUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      const decoded = jwtDecode(currentUser.token)
      if (decoded.id && decoded.username && blog.user.id === decoded.id && blog.user.username === decoded.username) {
        return true
      }
      return false
    }
  })

  const toggleVisibility = () => {
    setVisible((visible) => !visible)
  }

  const increaseLikes = (event) => {
    event.preventDefault()

    likeBlog(blog)
  }

  const handleRemoveBlog = (event) => {
    event.preventDefault()

    removeBlog(blog)
  }

  return (
    <div className='blog-entry'>
      <div>
        <span className={visible ? 'header' : ''}>
          <span className='title'>{blog.title}</span> (<span className='author'>{blog.author}</span>)
        </span>
        &nbsp;
        <button onClick={toggleVisibility}>{visible ? 'Less' : 'More'}</button>
      </div>
      {visible && (
        <div className='details'>
          <div>URL: <a href={blog.url} target='_blank'>{blog.url}</a></div>
          <div>Likes: {blog.likes} <button onClick={increaseLikes}>Like</button></div>
          <div>Entry added by: {blog.user.name}</div>
          {createdByCurrentUser && (
            <div><button onClick={handleRemoveBlog}>Remove</button></div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog