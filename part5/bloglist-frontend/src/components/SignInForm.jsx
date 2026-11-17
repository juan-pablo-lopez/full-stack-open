import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignInForm = ({ onSignIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    onSignIn({ username, password })

    setUsername('')
    setPassword('')

    navigate('/blogs')
  }

  const navigate = useNavigate()

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          User
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Sign in</button>
    </form>
  )
}

export default SignInForm