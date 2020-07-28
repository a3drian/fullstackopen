import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
    
    console.log('props (App.js):', props)

    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState(
        'Insert a new note...'
    )
    // Filtering displayed elements
    // daca lasam pe useState(true) apareau toate mereu pentru ca
    // nu se schimba in aplicatie starea lui 'showAll'
    const [showAll, setShowAll] = useState(false)
    const noteToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

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