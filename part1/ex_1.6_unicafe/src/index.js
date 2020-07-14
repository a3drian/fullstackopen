import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {

  console.log('Button()')
  console.log(props)

  const { handleClick, text } = props

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = (props) => {

  console.log('Display()')
  console.log(props)

  const { text, value } = props

  return (
    // <div>
    <p>{text} {value}</p>
    // </div>
  )
}

const GetAverage = (array) => {

  console.log('GetAverage()')
  console.log(array)

  const scores = array;

  let sum = 0;
  scores.forEach(value => {
    sum += value;
  });

  return sum / scores.length;
}

const GetPositiveFeedback = (good, total) => {
  console.log(good)
  console.log(total)

  return (good * 100) / total;
}

const Statistics = (props) => {

  console.log('MoreStatistics()')
  console.log(props)

  const { feedback, scores, total } = props

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  console.log('feedback', feedback);

  // unpack feedback values
  const good = feedback[0];
  const bad = feedback[1];
  const neutral = feedback[2];

  const positiveFeedback = GetPositiveFeedback(good, total);
  console.log('positive', positiveFeedback);

  const average = GetAverage(scores)

  return (
    <div>

      {/* <Display text='good' value={good} />
      <Display text='bad' value={bad} />
      <Display text='neutral' value={neutral} />
      <Display text='all' value={total} />
      <Display text='average' value={average} />
      <Display text='positive' value={positiveFeedback} /> */}

      <table>
        <tbody>
          <tr>
            <td>
              good
            </td>
            <td>
              {good}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              neutral
            </td>
            <td>
              {neutral}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              bad
            </td>
            <td>
              {bad}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              all
            </td>
            <td>
              {total}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              average
            </td>
            <td>
              {average.toFixed(1)}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              positive
            </td>
            <td>
              {positiveFeedback.toFixed(1)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log(getRandomInt(3));
// expected output: 0, 1 or 2

const App = (props) => {

  const { anecdotes } = props

  const [selected, setSelected] = useState(0)

  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allScores, setAllScores] = useState([])
  const [total, setTotal] = useState(0)

  const goodFeedback = () => {
    console.log(good);
    setGood(good + 1);
    setAllScores(allScores.concat(1));
    setTotal(total + 1);
  }

  const badFeedback = () => {
    console.log(bad);
    setBad(bad + 1);
    setAllScores(allScores.concat(-1));
    setTotal(total + 1);
  }

  const neutralFeedback = () => {
    console.log(neutral);
    setNeutral(neutral + 1);
    setAllScores(allScores.concat(0));
    setTotal(total + 1);
  }

  const reset = () => {
    setGood(0);
    setBad(0);
    setNeutral(0);
    setAllScores([]);
    setTotal(0);
  }

  const goodText = 'good';
  const badText = 'bad';
  const neutralText = 'neutral';

  const allFeedback = [good, bad, neutral];

  const selectAnecdote = () => {
    const rand = getRandomInt(anecdotes.length)
    setSelected(rand)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} text={goodText} />
      <Button handleClick={neutralFeedback} text={neutralText} />
      <Button handleClick={badFeedback} text={badText} />

      <h1>statistics</h1>
      <Statistics feedback={allFeedback} scores={allScores} total={total} />

      <Button handleClick={reset} text='reset' />

      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <Button handleClick={selectAnecdote} text='next anecdote' />

      <h1>Anecdote with most votes</h1>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)