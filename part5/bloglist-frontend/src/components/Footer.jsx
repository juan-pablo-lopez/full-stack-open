const Footer = () => {
  const footerStyle = {
    borderTop: 'dotted 1px silver'
  }

  const footerText = {
    color: 'silver'
  }

  return (
    <div style={footerStyle}>
      <p style={footerText}>
        <span style={{ fontStyle: 'italic' }}>Full Stack Open Course by the Department of Computer Science, University of Helsinki</span>
        &mdash; Implementation by Juan Pablo López
      </p>
    </div>
  )
}

export default Footer