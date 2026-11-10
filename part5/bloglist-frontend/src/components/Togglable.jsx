import { useState, useImperativeHandle } from 'react'

const Togglable = ({ ref, buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((visible) => !visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))

  return (
    <div>
      {visible && children}
      <button onClick={toggleVisibility}>{visible ? 'Cancel' : buttonLabel}</button>
    </div>
  )
}

export default Togglable