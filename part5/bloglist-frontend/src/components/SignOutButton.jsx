import { useNavigate } from 'react-router-dom'

const SignOutButton = ({ handleSignOut }) => {
  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault()
    handleSignOut()
    navigate('/blogs')
  }

  return (
    <button style={{ padding: '5px' }} onClick={handleClick}>Sign Out</button>
  )
}

export default SignOutButton