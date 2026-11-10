import Blog from './Blog'

const BlogList = ({ blogs }) => {

  return (
    <>
      <h2>Existing Blog Links</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default BlogList;