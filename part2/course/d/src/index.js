import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Axios and promises
// import axios from 'axios' // moved to App.js for effect-hooks

// nu e necesara salvarea intr-o variabila
// => se foloseste chain de functii, vezi mai jos
// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)

// function chaining
// axios
//     .get('http://localhost:3001/notes')
//     .then(response => {
//         const notes = response.data
//         console.log(notes)
//     })

// will fail because the address does not exist
// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

// const notes = [{
//     id: 1,
//     content: 'HTML is easy',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true
// },
// {
//     id: 2,
//     content: 'Browser can execute only Javascript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false
// },
// {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true
// }
// ]

// might be a bad solution:
// "notes" gets rendered only after a succesful request to
// the address specified in get()
// eg. only after we get a successful response
// also, it is not exactly known where to put get() properly
// axios.get('http://localhost:3001/notes').then(response => {
//     const notes = response.data
//     ReactDOM.render(
//         <App notes={notes} />,
//         document.getElementById('root')
//     )
// })

// we will be using effect hooks
// => no need to pass "notes" to <App>
ReactDOM.render(
    <App />,
    document.getElementById('root')
)