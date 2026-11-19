import { Alert } from '@mui/material'

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
      <p style={{ fontWeight: 'bold' }}>{message.intro}</p>
      {message.details && message.details.length > 0 && (
        <ul>
          {message.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
    </Alert>
  )
}

export default Notification