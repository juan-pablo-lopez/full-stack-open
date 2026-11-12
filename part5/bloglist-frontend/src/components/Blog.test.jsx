import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Content is rendered ...', () => {
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

  render(<Blog blog={item} />)

  screen.getByText('2025 LLM Year in Review')
  screen.getByText('Andrej Karpathy')

  const url = screen.queryByText('URL:')
  expect(url).toBeNull()

  const likes = screen.queryByText('Likes:')
  expect(likes).toBeNull()
})