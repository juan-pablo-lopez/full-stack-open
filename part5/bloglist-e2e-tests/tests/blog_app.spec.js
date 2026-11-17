const { describe, beforeEach, test, expect } = require('@playwright/test')
const { loginWith } = require('./helper')

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

  describe('Without session', async () => {
    test('Login form is displayed', {tag: '@NS-001'}, async ({ page }) => {
        await expect(page.getByText('Bloglist Application')).toBeVisible()
        await expect(page.getByText('Full Stack Open Course by the Department of Computer Science, University of Helsinki')).toBeVisible()

        await expect(page.getByLabel('User')).toBeVisible()
        await expect(page.getByLabel('Password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    })
  })

  describe('Login form', async () => {
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


})
