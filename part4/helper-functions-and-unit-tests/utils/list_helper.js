const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    console.log("Results:", total, blog.likes)
    return total + blog.likes
  }, 0)
}

module.exports = {
  dummy, totalLikes
}
