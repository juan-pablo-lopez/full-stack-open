import { useParams, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Typography
} from '@mui/material'

const Blog = ({ blogs, likeBlog, removeBlog }) => {
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return (
      <div className='blog-details'>
        <h2>Blog Details</h2>
        <div>
          <span className='title'>Blog not found!</span>
        </div>
      </div>
    )
  }

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const currentUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  const decoded = currentUser ? jwtDecode(currentUser.token) : null
  const createdByCurrentUser = Boolean(
    decoded?.id &&
    decoded?.username &&
    blog.user.id === decoded.id &&
    blog.user.username === decoded.username
  )

  const increaseLikes = (event) => {
    event.preventDefault()

    likeBlog(blog)
  }

  const handleRemoveBlog = (event) => {
    event.preventDefault()

    removeBlog(blog)

    navigate('/blogs')
  }

  return (
    <>
      <h2>{blog.title}</h2>

      <Card variant="outlined" sx={{ mt: 2, maxWidth: 700 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography color="text.secondary">
              By <Box component="span" sx={{ fontWeight: 'bold' }}>{blog.author}</Box>
            </Typography>

            <Typography color="text.secondary">
              <Link
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ overflowWrap: 'anywhere' }}
              >
                {blog.url}
              </Link>
            </Typography>

            <Typography>
              Likes: <Box component="span" sx={{ fontWeight: 'bold' }}>{blog.likes}</Box>
            </Typography>

            <Typography color="text.secondary">
              Entry added by: <Box component="span" sx={{ fontWeight: 'bold' }}>{blog.user.name}</Box>
            </Typography>

            {decoded && (
              <>
                <Divider />
                <Stack
                  direction="row"
                  spacing={2}
                  alignitems="center"
                  justifycontent="space-between"
                  flexwrap="wrap"
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={increaseLikes}
                  >
                    Like
                  </Button>

                  {createdByCurrentUser && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={handleRemoveBlog}
                    >
                      Remove
                    </Button>
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default Blog