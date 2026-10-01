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

module.exports = {
  dummy, totalLikes, favoriteBlog
}
