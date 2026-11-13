const { describe, beforeEach, test, expect } = require('@playwright/test')

describe('Bloglist Application', () => {
  beforeEach(async ({ page }) => {
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
})
