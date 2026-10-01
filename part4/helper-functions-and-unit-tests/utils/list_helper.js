const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.toSorted((a,b) => b.likes - a.likes)[0] ?? null
}

const mostBlogs = (blogList) => {
  if (blogList.length < 1) return {}
  const blogCount = blogList.reduce((accumulator, blog) => {
    accumulator[blog.author] = (accumulator[blog.author] || 0) + 1
    return accumulator
  }, {})
  const [author, blogs] = Object.entries(blogCount).sort((a, b) => b[1] - a[1])[0]
  return { author, blogs }
}

const mostLikes = (blogList) => {
  if (blogList.length < 1) return {}
  const likesCount = blogList.reduce((accumulator, blog) => {
    accumulator[blog.author] = (accumulator[blog.author] || 0) + blog.likes
    return accumulator
  }, {})
  const [author, likes] = Object.entries(likesCount).sort((a, b) => b[1] - a[1])[0]
  return { author, likes }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
