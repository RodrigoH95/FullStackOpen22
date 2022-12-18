import React, { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100  + " %";

  if(total === 0) {
    return (<div>No feedback given</div>)
  }

  return (
    <div>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={total}/>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="average" value={average}/>
    <StatisticLine text="positive" value={positive}/>

    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodReview = () => setGood(good + 1);
  const addNeutralReview = () => setNeutral(neutral + 1);
  const addBadReview = () => setBad(bad + 1);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={addGoodReview} text="good" />
      <Button onClick={addNeutralReview} text="neutral" />
      <Button onClick={addBadReview} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
