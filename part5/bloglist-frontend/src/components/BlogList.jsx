import Blog from './Blog'

const BlogList = ({ blogs, likeBlog }) => {

  return (
    <>
      <h2>Existing Blog Links</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      )}
    </>
  )
}

export default BlogList;