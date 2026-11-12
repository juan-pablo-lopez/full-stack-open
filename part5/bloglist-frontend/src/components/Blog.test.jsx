import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('Content is rendered without details ...', () => {
  render(<Blog blog={item} />)

  // Validate title and author are displayed, separately as they exist as different <span> objects.
  screen.getByText('2025 LLM Year in Review')
  screen.getByText('Andrej Karpathy')

  // Validate URL is not displayed.
  const url = screen.queryByText('https://karpathy.bearblog.dev/year-in-review-2025/')
  expect(url).toBeNull()

  // Validate Likes is not displayed.
  const likes = screen.queryByText('Likes: 2755')
  expect(likes).toBeNull()
})

test('Content is rendered with details ...', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={item} toggleVisibility={mockHandler} />)

  // Validate title and author are displayed, separately as they exist as different <span> objects.
  screen.getByText('2025 LLM Year in Review')
  screen.getByText('Andrej Karpathy')

  // Validate URL is not displayed.
  let url = screen.queryByText('https://karpathy.bearblog.dev/year-in-review-2025/')
  expect(url).toBeNull()

  // Validate Likes is not displayed.
  let likes = screen.queryByText('Likes: 2755')
  expect(likes).toBeNull()

  const user = userEvent.setup()
  const moreButton = screen.getByText('More')
  await user.click(moreButton)

  // Validate title and author remain visible.
  screen.getByText('2025 LLM Year in Review')
  screen.getByText('Andrej Karpathy')

  // Validate URL and Likes are now visible
  screen.getByText('https://karpathy.bearblog.dev/year-in-review-2025/')
  screen.getByText('Likes: 2755')
})
