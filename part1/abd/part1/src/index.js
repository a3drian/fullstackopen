import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const History = (props) => {
    
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }

    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = (props) => {
    console.log(props)
    const { onClick, text } = props
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App = (props) => {

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    // Handling arrays
    const [allClicks, setAll] = useState([])

    // const handleLeftClick = () => {
    //     const newClicks = {
    //         left: clicks.left + 1,
    //         right: clicks.right
    //     }
    //     setClicks(newClicks)
    // }

    // const handleRightClick = () => {
    //     const newClicks = {
    //         left: clicks.left,
    //         right: clicks.right + 1
    //     }
    //     setClicks(newClicks)
    // }

    // folosind object spread syntax
    // const handleLeftClick = () => {
    //     const newClicks = {
    //         ...clicks,
    //         left: clicks.left + 1
    //     }
    //     setClicks(newClicks)
    // }

    // const handleRightClick = () => {
    //     const newClicks = {
    //         ...clicks,
    //         right: clicks.right + 1
    //     }
    //     setClicks(newClicks)
    // }

    // Handling arrays
    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
        console.log(allClicks.join(' '))
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
        console.log(allClicks.join(' '))
    }

    // debugger

    const resetRightClick = () => {
        setRight(0)
    }

    const setToValue = (newValue) => () => {
        setRight(newValue)
    }

    return (
        <div>
            <div>
                {left}
                {/* <button onClick={handleLeftClick}>left</button> */}
                {/* <button onClick={handleRightClick}>right</button> */}
                <Button onClick={handleLeftClick} text='increase left' />
                <Button onClick={handleRightClick} text='increase right' />
                {right}
                {/* <p>{allClicks.join(' ')}</p> */}
                <History allClicks={allClicks} />
                <Button onClick={resetRightClick} text='reset right to 0' />
                <Button onClick={setToValue(69)} text='reset right to 69' />
                <Button onClick={setToValue(100)} text='reset right to 100' />
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)