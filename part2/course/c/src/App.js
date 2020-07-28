import React, { useState, useEffect } from 'react'
import Note from './components/Note'

import axios from 'axios'

const App = (props) => {

    console.log('props (App.js):', props)

    // const [notes, setNotes] = useState(props.notes)  // we will be using effect-hooks
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'Insert a new note...'
    )

    // Filtering displayed elements
    // daca lasam pe useState(true) apareau toate mereu pentru ca
    // nu se schimba in aplicatie starea lui 'showAll'
    const [showAll, setShowAll] = useState(true)
    const noteToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    // using effect-hooks to fetch data from serer
    const handleResponse = (response) => {
        console.log('promise fulfilled');
        setNotes(response.data);
    }
    const effect_hook = () => {
        console.log('this is an effect-hook function');
        // get() returneaza un promise
        const promise = axios.get('http://localhost:3001/notes');
        promise.then(handleResponse);
    }
    useEffect(effect_hook, []);
    console.log('render', notes.length, 'notes');

    const AddNote = (event) => {
        event.preventDefault()
        console.log('AddNote() button clicked', event.target)
        // finishing the function
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const HandleNoteChange = (event) => {
        console.log('HandleNoteChange()', event.target)
        console.log('HandleNoteChange()', event.target.value)
        setNewNote(event.target.value)
    }

    const HandleShowAll = () => {
        setShowAll(!showAll)
    }


    return (
        <div>
            <h1> Notes </h1>

            {/* <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul> */}

            <ul>
                {noteToShow.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>

            <div>
                <button onClick={HandleShowAll}>
                    show {showAll ? 'important' : 'all'} notes
                </button>
            </div>

            <h3> Insert a new note </h3>
            <form onSubmit={AddNote}>
                <input value={newNote}
                    onChange={HandleNoteChange}
                />
                <button type="submit">
                    save
                </button>
            </form>

        </div>
    )
}

export default App