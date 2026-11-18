const loginWith = async (page, username, password)  => {
  await page.getByLabel('User').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}

const addBlog = async (page, title, author, url, likes) => {
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('URL').fill(url)
  await page.getByLabel('Likes').fill(likes)
  await page.getByRole('button', { name: 'Add' }).click()
}

export { loginWith, addBlog }