export const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="banner-container">
      <div className={`message-banner ${type}`}>
        <div className="banner-content">
          <span className="banner-text">{message}</span>
        </div>
      </div>
    </div>
  )
}
