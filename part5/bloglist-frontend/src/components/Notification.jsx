export const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  return (
    <div className="banner-container">
      <div className={`message-banner ${type}`}>
        <div className="banner-content">
          <div className="banner-text">
            <p style={{fontWeight: 'bold'}}>{message.intro}</p>
            {message.details && message.details.length > 0 && (
              <ul>
                {message.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}