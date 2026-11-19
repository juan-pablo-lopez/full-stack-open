import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const SignOutButton = ({ handleSignOut }) => {
  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault()
    handleSignOut()
    navigate('/blogs')
  }

  return (
    <Button color="inherit" onClick={handleClick}>Sign Out</Button>
  )
}

export default SignOutButton