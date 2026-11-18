import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import jwt from 'jsonwebtoken'
import Blog from './Blog'

const items = [{
  title: '2025 LLM Year in Review',
  author: 'Andrej Karpathy',
  url: 'https://karpathy.bearblog.dev/year-in-review-2025/',
  likes: 2755,
  user: {
    name: 'Le Chicharroné',
    username: 'chicharrone',
    id: '123'
  }
}]

const otherUserItems = [{
  title: '2025 LLM Year in Review',
  author: 'Andrej Karpathy',
  url: 'https://karpathy.bearblog.dev/year-in-review-2025/',
  likes: 2755,
  user: {
    name: 'System Administrator',
    username: 'root',
    id: '100'
  }
}]

describe('When user is not logged in', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('Details are present, buttons are not', async () => {
    render(<MemoryRouter><Blog blogs={items} /></MemoryRouter>)

    screen.getByText('2025 LLM Year in Review')
    screen.getByText('Andrej Karpathy')
    screen.queryByText('https://karpathy.bearblog.dev/year-in-review-2025/')
    screen.queryByText('Likes: 2755')

    const likeButton = screen.queryByRole('button', { name: 'Like' })
    expect(likeButton).toBeNull()

    const removeButton = screen.queryByRole('button', { name: 'Remove' })
    expect(removeButton).toBeNull()
  })
})

describe('When user is logged in', () => {
  beforeEach(() => {
    const token = jwt.sign({ id: '123', username: 'chicharrone' }, 'test-secret')

    const loggedUser = {
      username: 'chicharrone',
      name: 'Le Chicharroné',
      token
    }

    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
  })

  test('Number of clicks is recorded accurately', async () => {
    const likeButtonHandler = vi.fn()

    render(<MemoryRouter><Blog blogs={items} likeBlog={likeButtonHandler} /></MemoryRouter>)

    const user = userEvent.setup()

    screen.getByText('2025 LLM Year in Review')
    screen.getByText('Andrej Karpathy')
    screen.getByText('https://karpathy.bearblog.dev/year-in-review-2025/')
    screen.getByText('Likes: 2755')

    // Click on "Like" button twice and account for it properly
    const likeButton = screen.getByRole('button', { name: 'Like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeButtonHandler).toHaveBeenCalledTimes(2)
  })

  test('Remove button is displayed for own blogs', async () => {
    render(<MemoryRouter><Blog blogs={items} /></MemoryRouter>)

    screen.getByText('2025 LLM Year in Review')
    screen.getByText('Andrej Karpathy')
    screen.getByText('https://karpathy.bearblog.dev/year-in-review-2025/')
    screen.getByText('Likes: 2755')

    const likeButton = screen.queryByRole('button', { name: 'Like' })
    expect(likeButton).toBeInTheDocument()

    const removeButton = screen.queryByRole('button', { name: 'Remove' })
    expect(removeButton).toBeInTheDocument()
  })

  test('Remove button is NOT displayed for blogs createdy by another user', async () => {
    render(<MemoryRouter><Blog blogs={otherUserItems} /></MemoryRouter>)

    screen.getByText('2025 LLM Year in Review')
    screen.getByText('Andrej Karpathy')
    screen.getByText('https://karpathy.bearblog.dev/year-in-review-2025/')
    screen.getByText('Likes: 2755')

    const likeButton = screen.queryByRole('button', { name: 'Like' })
    expect(likeButton).toBeInTheDocument()

    const removeButton = screen.queryByRole('button', { name: 'Remove' })
    expect(removeButton).toBeNull()
  })

  afterEach(() => {
    window.localStorage.clear()
  })
})
