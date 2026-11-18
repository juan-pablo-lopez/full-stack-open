import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const AddBlogForm = ({ createBlogEntry }) => {
  const navigate = useNavigate()
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

    navigate('/blogs')
  }

  return (
    <>
      <h2>Add Blog Entry</h2>
      <form onSubmit={addBlogEntry}>
        <TextField
          label="Title"
          fullWidth={true}
          margin='dense'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="Author"
          fullWidth={true}
          margin='dense'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="URL"
          fullWidth={true}
          margin='dense'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <TextField
          label="Likes"
          fullWidth={true}
          margin='dense'
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>Add</Button>
        </div>
      </form>
    </>
  )
}

export default AddBlogForm