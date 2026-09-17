import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = type => {
    if (type == "good") {
      console.log("Feedback was good!");
      setGood(good+1);
    } else if (type == "neutral") {
      console.log("Feedback was neutral.");
      setNeutral(neutral+1);
    } else if (type == "bad") {
      console.log("Feedback was bad!");
      setBad(bad+1);
    } else {
      console.log("Feedback was unknown.");
    }
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={() => handleFeedback('good')} text="Good" />
      <Button onClick={() => handleFeedback('neutral')} text="Neutral" />
      <Button onClick={() => handleFeedback('bad')} text="Bad" />
      <hr />
      <h2>Statistics</h2>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
      </ul>
    </div>
  )
}

export default App