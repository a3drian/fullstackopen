import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import NoteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

// vom folosi NoteService => acolo avem 'axios'
// import axios from 'axios'

const App = () => {

    // nu mai trimitem prin props din index.js
    // console.log('props (App.js):', props)

    // const [notes, setNotes] = useState(props.notes)  // we will be using effect-hooks
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'Insert a new note...'
    )

    const [showAll, setShowAll] = useState(true)
    const noteToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    // Improved error message
    const [errorMessage, setErrorMessage] = useState(null);

    // Using effect-hooks to fetch data from serer
    const handleResponse = (response) => {
        console.log('promise fulfilled');
        setNotes(response.data);
    }
    const effect_hook = () => {
        console.log('this is an effect-hook function');
        // get() returneaza un promise
        // const promise = axios.get('http://localhost:3001/notes');
        // promise.then(handleResponse);

        // vom folosi NoteService
        // NoteService
        //     .GetAll()
        //     .then(handleResponse);

        // vom folosi direct response.data
        NoteService
            // .GetAll()
            .GetAllFail()
            .then(initialData => {
                setNotes(initialData);
            });
    }
    useEffect(effect_hook, []);
    console.log('render', notes.length, 'notes');

    // toggling importance of notes
    const toggleImportangeOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`);
        // finishing up
        // const url = `http://localhost:3001/notes/${id}`; // avem baseURL in App.js
        const note = notes.find(n => n.id === id);
        const changedNote = {
            ...note,
            important: !note.important
        }

        // vom folosi NoteService
        // axios
        //     .put(url, changedNote)
        //     .then((response) => {
        //         setNotes(notes.map(
        //             note => note.id !== id ? note : response.data
        //         ))
        //     });

        // vom folosi direct response.data
        // NoteService.Update(id, changedNote)
        //     .then((response) => {
        //         setNotes(notes.map(
        //             note => note.id !== id ? note : response.data
        //         ))
        //     })

        // vom adauga error handling cu catch()
        // NoteService
        //     .Update(id, changedNote)
        //     .then(returnedData => {
        //         setNotes(notes.map(
        //             note => note.id !== id ? note : returnedData
        //         ))
        //     })

        // vom folosi noua componenta Notification
        // NoteService
        //     .Update(id, changedNote)
        //     .then(returnedData => {
        //         setNotes(notes.map(
        //             note => note.id !== id ? note : returnedData
        //         ))
        //     })
        //     .catch(error => {
        //         console.log('error:', error);
        //         alert(`The note "${note.content}" was already deleted from the server.`);
        //         setNotes(notes.filter(
        //             n => n.id !== id
        //         ))
        //     })

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
        // finishing the function
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            // id: notes.length + 1,
        }

        // vom trimite noul "note" la server
        // setNotes(notes.concat(noteObject))
        // setNewNote('')

        // axios
        //     .post('http://localhost:3001/notes', noteObject)
        //     .then(response => {
        //         console.log(response);
        //         setNotes(notes.concat(response.data))
        //         setNewNote('')
        //     });

        // vom folosi direct response.data
        // NoteService
        //     .Create(noteObject)
        //     .then(response => {
        //         console.log(response);
        //         setNotes(notes.concat(response.data))
        //         setNewNote('')
        //     });

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

            {/* <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul> */}

            <ul>
                {noteToShow.map((note, i) =>
                    <Note key={note.id}
                        note={note}
                        toggleImportance={() =>
                            toggleImportangeOf(note.id)
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