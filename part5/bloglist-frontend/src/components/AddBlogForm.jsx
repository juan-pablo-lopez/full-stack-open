import { useState } from 'react'

const AddBlogForm = ({ createBlogEntry }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlogEntry = (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    createBlogEntry(blog)

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <form onSubmit={addBlogEntry}>
      <h2>Add Blog Entry</h2>
      <div>
        <label>
        Title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
        Author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
        URL
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
        Likes
          <input
            type="text"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </label>
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddBlogForm