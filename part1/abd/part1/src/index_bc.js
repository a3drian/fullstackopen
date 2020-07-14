import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Counter = () => {

    const [counter, setCounter] = useState(0)

    // console.log(counter) // incepe cu 0
    // console.log(setCounter) // function dispatchAction()

    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    console.log('rendering...', counter)

    return counter;
}

// const Display = (props) => {
//     return (
//         <div>{props.counter}</div>
//     )
// }

// Display re-factored
const Display = ({ counter }) => <div>{counter}</div>

const Button = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>
                {props.name}
            </button>
        </div>
    )
}

const App = () => {

    const [counter, setCounter] = useState(0)

    // event handling
    const increaseByOne = () => {
        console.log('plus')
        setCounter(counter + 1)
    }

    const decreaseByOne = () => {
        console.log('minus')
        setCounter(counter - 1)
    }

    const setToZero = () => {
        console.log('reset')
        setCounter(0)
    }

    return (
        <div>

            <div>
                Automatic counter:
                <Counter />
            </div>

            <div>
                Manual counter:
                <Display counter={counter} />
            </div>

            <Button handleClick={increaseByOne}
                name="plus (+)" />
            <Button handleClick={decreaseByOne}
                name="minus (-)" />
            <Button handleClick={setToZero}
                name="reset (0)" />

            {/* <button onClick={increaseByOne}>
                plus (+)
            </button>
            <button onClick={decreaseByOne}>
                minus (-)
            </button>
            <button onClick={setToZero}>
                reset (0)
            </button> */}

        </div>
    )

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)