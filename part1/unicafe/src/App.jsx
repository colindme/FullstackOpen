import { useState } from 'react'

const Feedback = ({ buttonInfo }) => {
  // transform buttonInfo into buttonElements (key required to remove error)
  const buttons = buttonInfo.map(val => <Button key={val.text} text={val.text} onClick={val.onClick}/>)
  return (
    <div>
      <h1>Give feedback</h1>
      {buttons}
    </div>
  )
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  let body = "";
  if (total == 0)
  {
    body = <p>No feedback given yet</p>
  }
  else
  {
    body = <table>
      <tbody>
      <StatisticLine startingText="good" value={good} />
      <StatisticLine startingText="neutral" value={neutral} />
      <StatisticLine startingText="bad" value={bad} />
      <StatisticLine startingText="average" value={(good - bad) / total} />
      <StatisticLine startingText="positive" value={(good / total) * 100} endingText="%" />
      </tbody>
    </table>
  }
  
  return (
    <div>
      <h1>Statistics</h1>
      {body}
    </div>
  )
}

const StatisticLine = ({ startingText, value, endingText }) => <tr><td>{startingText}</td><td>{value} {endingText}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementState = (state, setter) => () => setter(state + 1)

  let buttonInfo = [
    {
      "text": "good",
      "onClick": incrementState(good, setGood) 
    },
    {
      "text": "neutral",
      "onClick": incrementState(neutral, setNeutral) 
    },
    {
      "text": "bad",
      "onClick": incrementState(bad, setBad) 
    }
  ]

  return (
    <div>
      <Feedback buttonInfo={buttonInfo}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App