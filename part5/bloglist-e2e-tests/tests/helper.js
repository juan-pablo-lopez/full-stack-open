const loginWith = async (page, username, password)  => {
  await page.getByLabel('User').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}

export { loginWith }