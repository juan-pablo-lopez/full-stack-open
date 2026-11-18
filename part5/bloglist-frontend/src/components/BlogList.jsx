import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Existing Blog</h2>
      <div className='blog-list'>
        {sortedBlogs.map(blog =>
          <div key={blog.id} className='blog-entry blog-bullet'>
            <div>
              <Link to={`/blogs/${blog.id}`} className='title'>{blog.title}</Link> (<span className='author'>{blog.author}</span>)
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList