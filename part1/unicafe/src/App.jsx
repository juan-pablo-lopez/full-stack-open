import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [pp, setPP] = useState(0);

  const handleGoodFeedback = () => {
    console.log("Feedback was good!");
    const newGood = good + 1;
    setGood(newGood);
    const newAll = newGood + neutral + bad;
    setAll(newAll)
    // This average is calculated based on the screenshot in the materials, in which the values:
    // Good 6, Neutral 2, Bad 1, All 9 gives an average of 0.555555
    // So, the formula is (Good - Bad) / All.
    setAvg((newGood - bad) / newAll);
    setPP((newGood / newAll) * 100);
  };

  const handleNeutralFeedback = () => {
    console.log("Feedback was neutral.");
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const newAll = good + newNeutral + bad;
    setAll(newAll)
    // This average is calculated based on the screenshot in the materials, in which the values:
    // Good 6, Neutral 2, Bad 1, All 9 gives an average of 0.555555
    // So, the formula is (Good - Bad) / All.
    setAvg((good - bad) / newAll);
    setPP((good / newAll) * 100);
  };

  const handleBadFeedback = () => {
    console.log("Feedback was bad!");
    const newBad = bad + 1;
    setBad(newBad);
    const newAll = good + neutral + newBad;
    setAll(newAll)
    // This average is calculated based on the screenshot in the materials, in which the values:
    // Good 6, Neutral 2, Bad 1, All 9 gives an average of 0.555555
    // So, the formula is (Good - Bad) / All.
    setAvg((good - newBad) / newAll);
    setPP((good / newAll) * 100);
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={handleGoodFeedback} text="Good" />
      <Button onClick={handleNeutralFeedback} text="Neutral" />
      <Button onClick={handleBadFeedback} text="Bad" />
      <hr />
      <h2>Statistics</h2>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
        <li>Total: {all}</li>
        <li>Average: {avg}</li>
        <li>Positive Percentage: {pp}%</li>
      </ul>
    </div>
  );
}

export default App