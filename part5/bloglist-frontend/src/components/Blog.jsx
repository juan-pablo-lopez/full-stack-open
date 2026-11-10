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
    <div style={{ padding: '10px', marginBottom: '10px', border: 'dotted 1px gray', borderRadius: '5px' }}>
      <div>
        <span style={visible ? { paddingBottom: '5px', borderBottom: 'solid 1px gray' } : {}}>
          <span style={{ fontWeight: 'bold' }}>{blog.title}</span> (<span style={{ fontStyle: 'italic' }}>{blog.author}</span>)
        </span>
        &nbsp;
        <button onClick={toggleVisibility}>{visible ? 'Less' : 'More'}</button>
      </div>
      {visible && (
        <div style={{ padding: '15px 0 0 10px' }}>
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