import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, removeBlog }) => {

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>Existing Blog Links</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
      )}
    </>
  )
}

export default BlogList;