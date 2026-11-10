import { useState } from 'react';

const Blog = ({ blog, likeBlog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((visible) => !visible)
  }

  const increaseLikes = (event) => {
    event.preventDefault();

    likeBlog(blog);
  }

  return (
    <div style={{ padding: '10px', marginBottom: '10px', border: 'dotted 1px gray', borderRadius: '5px' }}>
      <div>
        <span style={visible ? { paddingBottom: '5px', borderBottom: 'solid 1px gray' } : {}}>
          <span style={{fontWeight: 'bold'}}>{blog.title}</span> (<span style={{fontStyle: 'italic'}}>{blog.author}</span>)
        </span>
        &nbsp;
        <button onClick={toggleVisibility}>{visible ? 'Less' : 'More'}</button>
      </div>
      {visible && (
        <div style={{ padding: '15px 0 0 10px' }}>
          <div>URL: <a href={blog.url} target='_blank'>{blog.url}</a></div>
          <div>Likes: {blog.likes} <button onClick={increaseLikes}>Like</button></div>
          <div>Entry added by: {blog.user.name}</div>
        </div>
      )}
    </div>  
  )
}

export default Blog