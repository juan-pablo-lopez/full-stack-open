import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

const item = {
  title: '2025 LLM Year in Review',
  author: 'Andrej Karpathy',
  url: 'https://karpathy.bearblog.dev/year-in-review-2025/',
  likes: 2755,
  user: {
    name: 'Le Chicharrone',
    username: 'chicharrone'
  }
}

test('Creation of a Blog entry is reflected accurately ...', async () => {
  const addButtonHandler = vi.fn()
  const user = userEvent.setup()

  render(<AddBlogForm createBlogEntry={addButtonHandler} />)

  const title = screen.getByLabelText('Title')
  const author = screen.getByLabelText('Author')
  const url = screen.getByLabelText('URL')
  const likes = screen.getByLabelText('Likes')
  const addButton = screen.getByRole('button', { name: 'Add' })

  await user.type(title, item.title)
  await user.type(author, item.author)
  await user.type(url, item.url)
  await user.type(likes, String(item.likes))
  await user.click(addButton)

  expect(addButtonHandler).toHaveBeenCalledTimes(1)
  expect(addButtonHandler.mock.calls[0][0].title).toBe(item.title)
  expect(addButtonHandler.mock.calls[0][0].author).toBe(item.author)
  expect(addButtonHandler.mock.calls[0][0].url).toBe(item.url)
  expect(addButtonHandler.mock.calls[0][0].likes).toBe(String(item.likes))
})
