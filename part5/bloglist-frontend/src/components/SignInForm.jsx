import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

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
    <>
      <h2>Start Session</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User"
          fullWidth={true}
          margin='dense'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="Password"
          fullWidth={true}
          margin='dense'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>Sign in</Button>
        </div>
      </form>
    </>
  )
}

export default SignInForm