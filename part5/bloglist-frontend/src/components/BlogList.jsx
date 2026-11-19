import React from 'react'
import { Link } from 'react-router-dom'
import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>Existing Blogs</h2>

      <Paper variant="outlined" sx={{ maxWidth: 800 }}>
        <List disablePadding>
          {sortedBlogs.map((blog, index) => (
            <React.Fragment key={blog.id}>
              {index > 0 && <Divider />}

              <ListItemButton
                component={Link}
                to={`/blogs/${blog.id}`}
                sx={{ py: 2, px: 3 }}
              >
                <ListItemText
                  primary={blog.title}
                  secondary={`by ${blog.author}`}
                  primarytypographyprops={{
                    fontWeight: 600
                  }}
                />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </>
  )
}

export default BlogList