import React from 'react'
import ReactDOM from 'react-dom'

// alta componenta React
const Hello = (props) => {

  console.log('Hello from <Hello />')

  return (
    <div>
      <p>Hello {props.name}, you are of age {props.age}.</p>
    </div>
  )
}

// componenta React asignata unei constante
const App = () => {

  console.log('Hello from <App />')

  const now = new Date()
  const a = 10
  const b = 20

  const name = "Teo"
  const age = 10

  return (
    <>
      <p>Hello world, it is {now.toString()}.</p>
      <p>
        {a} plus {b} is {a + b}.
      </p>

      {/* Hello de mai sus, scrisa de sine statator */}
      <Hello name="Adrian" age={15+10}/>
      <Hello name="Teodor" age={20}/>
      <Hello name={name} age={age}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))