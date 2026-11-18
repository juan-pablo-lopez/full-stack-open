const { describe, beforeEach, test, expect } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Bloglist Application', () => {
  const homeUrl = 'http://localhost:5173/'
  const blogsUrl = 'http://localhost:5173/blogs'
  const loginUrl = 'http://localhost:5173/login'
  const createUrl = 'http://localhost:5173/create'
  const resetDbUrl = 'http://localhost:5173/api/testing/reset'
  const addUserUrl = 'http://localhost:5173/api/users'
  const lcName = 'Le Chicharroné'
  const lcUser = 'chicharrone'
  const lcPassword = 'Th1$ is an easy password'
  const rtUser = 'root'
  const rtPassword = 'Th1$ is root user password'
  const rtName = 'System Administrator'

  const blogTitle = '2025 LLM Year in Review'
  const blogUrl = 'https://karpathy.bearblog.dev/year-in-review-2025/'
  const blogAuthor = 'Andrej Karpathy'
  const blogLikes = '2755'

  beforeEach(async ({ page, request }) => {
    await request.post(resetDbUrl)
    await request.post(addUserUrl, {
      data: {
        name: lcName,
        username: lcUser,
        password: lcPassword
      }
    })
    await request.post(addUserUrl, {
      data: {
        name: rtName,
        username: rtUser,
        password: rtPassword
      }
    })
  })

  describe('No session', () => {
    test('Home page is displayed', {tag: ['@NS-001', '@No-Session']}, async ({ page }) => {
        await page.goto(homeUrl)

        await expect(page.getByText('Bloglist Application')).toBeVisible()
    })

    test('Blogs page is displayed', {tag: ['@NS-002', '@No-Session']}, async ({ page }) => {
        await page.goto(blogsUrl)

        await expect(page.getByText('Existing Blogs')).toBeVisible()
    })

    test('Login form is displayed', {tag: ['@NS-003', '@No-Session']}, async ({ page }) => {
        await page.goto(loginUrl)

        await expect(page.getByText('Start Session')).toBeVisible()
        await expect(page.getByLabel('User')).toBeVisible()
        await expect(page.getByLabel('Password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    })
  })

  describe('Login form', () => {
    test('Is successful if correct credentials are used', {tag: ['@LF-001', '@Login-Form']}, async ({ page }) => {
      await page.goto(loginUrl)

      await loginWith(page, lcUser, lcPassword)
      await expect(page.getByText(`Welcome ${lcName}!`)).toBeVisible()
    })

    test('Is unsuccessful if incorrect credentials are used', {tag: ['@LF-002', '@Login-Form']}, async ({ page }) => {
      await page.goto(loginUrl)

      await loginWith(page, lcUser, 'incorrect')
      await expect(page.getByText('Credentials are incorrect!')).toBeVisible()
      await expect(page.getByText(`Welcome ${lcName}!`)).not.toBeVisible()
    })
  })

  describe('With session', () => {
    beforeEach(async ({ page }) => {
      await page.goto(loginUrl)
      await loginWith(page, lcUser, lcPassword)
      await expect(page.getByText(`Welcome ${lcName}!`)).toBeVisible()
    })

    test('User can create a new blog', {tag: ['@WS-001', '@With-Session']}, async ({ page }) => {
      await page.goto(createUrl)
      await addBlog(page, blogTitle, blogAuthor, blogUrl, blogLikes)

      await expect(page.getByText(blogTitle, { exact: true })).toBeVisible()
    })

    test('User can like a blog', {tag: ['@WS-002', '@With-Session']}, async ({ page }) => {
      await page.goto(createUrl)
      await addBlog(page, blogTitle, blogAuthor, blogUrl, blogLikes)

      await page.getByRole('link', { name: blogTitle }).click()

      await expect(page.getByText(blogUrl)).toBeVisible()
      await expect(page.getByText(`Likes: ${blogLikes}`)).toBeVisible()
      await expect(page.getByText(`Entry added by: ${lcName}`)).toBeVisible()

      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('Likes: 2756')).toBeVisible()
    })

    test('User can delete a blog', {tag: ['@WS-003', '@With-Session']}, async ({ page }) => {
      await page.goto(createUrl)
      await addBlog(page, blogTitle, blogAuthor, blogUrl, blogLikes)

      await page.getByRole('link', { name: blogTitle }).click()

      await expect(page.getByText(blogUrl)).toBeVisible()
      await expect(page.getByText(`Likes: ${blogLikes}`)).toBeVisible()
      await expect(page.getByText(`Entry added by: ${lcName}`)).toBeVisible()

      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe(`Remove '${blogTitle}' entry?`)
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'Remove' }).click()
      await expect(page.getByText(`Blog '${blogTitle}' removed!`, { exact: true })).toBeVisible()
    })

    test('User CANNOT delete a blog created by ANOTHER user', {tag: ['@WS-004', '@With-Session']}, async ({ page }) => {
      await page.goto(createUrl)
      await addBlog(page, blogTitle, blogAuthor, blogUrl, blogLikes)
      await expect(page.getByRole('link', { name: blogTitle })).toBeVisible()
      await page.getByRole('button', { name: 'Sign out' }).click()

      await page.goto(loginUrl)
      await loginWith(page, rtUser, rtPassword)
      await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()

      await expect(page.getByRole('link', { name: blogTitle })).toBeVisible()

      await page.getByRole('link', { name: blogTitle }).click()

      await expect(page.getByText(blogUrl)).toBeVisible()
      await expect(page.getByText(`Likes: ${blogLikes}`)).toBeVisible()
      await expect(page.getByText(`Entry added by: ${lcName}`)).toBeVisible()

      await expect(page.getByRole('button', { name: 'Like' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })
  })
})
