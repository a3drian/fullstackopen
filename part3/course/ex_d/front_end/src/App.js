import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import NoteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'Insert a new note...'
    )

    const [showAll, setShowAll] = useState(true)
    const noteToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const [errorMessage, setErrorMessage] = useState(null);

    const effect_hook = () => {
        console.log('this is an effect-hook function');
        NoteService
            .GetAll()
            .then(initialData => {
                setNotes(initialData);
            });
    }
    useEffect(effect_hook, []);
    console.log('render', notes.length, 'notes');

    const deleteNote = (id) => {
        console.log('deleteNote()');
        console.log(`note with ${id} needs to be deleted`);

        NoteService
            .Delete(id)
            .then(setNotes(notes.filter(n => n.id !== id)))
            .catch(error => {
                console.log('error:', error);
                setErrorMessage(`The note with ${id} was already deleted from the server.`);
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000);
            })
    }

    const toggleImportanceOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`);
        const note = notes.find(n => n.id === id);
        const changedNote = {
            ...note,
            important: !note.important
        }

        NoteService
            .Update(id, changedNote)
            .then(returnedData => {
                setNotes(notes.map(
                    note => note.id !== id ? note : returnedData
                ))
            })
            .catch(error => {
                console.log('error:', error);
                setErrorMessage(`The note "${note.content}" was already deleted from the server.`);
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000);
                setNotes(notes.filter(
                    n => n.id !== id
                ))
            })
    }

    const AddNote = (event) => {
        event.preventDefault()
        console.log('AddNote() button clicked', event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }

        NoteService
            .Create(noteObject)
            .then(returnedData => {
                console.log(returnedData);
                setNotes(notes.concat(returnedData));
                setNewNote('');
            });

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

            <Notification message={errorMessage} />

            <ul>
                {noteToShow.map((note, i) =>
                    <Note key={note.id}
                        note={note}
                        toggleImportance={() =>
                            toggleImportanceOf(note.id)
                        }
                        deleteNote={() =>
                            deleteNote(note.id)
                        }
                    />
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

            <Footer />

        </div>
    )
}

export default App
