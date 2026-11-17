const { describe, beforeEach, test, expect } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Bloglist Application', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Le Chicharroné',
        username: 'chicharrone',
        password: 'Th1$ is an easy password'
      }
    })
    await page.goto('http://localhost:5173')
  })

  describe('Without session', () => {
    test('Login form is displayed', {tag: '@NS-001'}, async ({ page }) => {
        await expect(page.getByText('Bloglist Application')).toBeVisible()
        await expect(page.getByText('Full Stack Open Course by the Department of Computer Science, University of Helsinki')).toBeVisible()

        await expect(page.getByLabel('User')).toBeVisible()
        await expect(page.getByLabel('Password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    })
  })

  describe('Login form', () => {
    test('Is successful if correct credentials are used', {tag: '@LF-001'}, async ({ page }) => {
      await loginWith(page, 'chicharrone', 'Th1$ is an easy password')
      await expect(page.getByText('Le Chicharroné is logged in!')).toBeVisible()
    })

    test('Is unsuccessful if incorrect credentials are used', {tag: '@LF-002'}, async ({ page }) => {
      await loginWith(page, 'chicharrone', 'incorrect')
      await expect(page.getByText('Credentials are incorrect!')).toBeVisible()
      await expect(page.getByText('Le Chicharroné is logged in!')).not.toBeVisible()
    })
  })

  describe('With session', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'chicharrone', 'Th1$ is an easy password')
    })

    test('User can create a new blog', {tag: '@WS-001'}, async ({ page }) => {
      await addBlog(page, '2025 LLM Year in Review', 'Andrej Karpathy',
        'https://karpathy.bearblog.dev/year-in-review-2025/', '2755')

      await expect(page.getByText('2025 LLM Year in Review', { exact: true })).toBeVisible()
    })

    test('User can like a blog', {tag: '@WS-002'}, async ({ page }) => {
      await addBlog(page, '2025 LLM Year in Review', 'Andrej Karpathy',
        'https://karpathy.bearblog.dev/year-in-review-2025/', '2755')

      await page.getByRole('button', { name: 'More' }).click()
      await expect(page.getByText('Likes: 2755')).toBeVisible()

      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('Likes: 2756')).toBeVisible()
    })

  })
})
