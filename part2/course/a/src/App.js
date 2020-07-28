import React from 'react'
import Note from './components/Note'

// const App = (props) => {
const App = ({ notes }) => {

    // pentru ca folosim despechetarea "{}" direct in antet
    // const {notes} = props

    const mapNotes = notes.map(note => {
        let mapObj = {}
        mapObj['key'] = note.id
        mapObj['content'] = note.content

        return mapObj
    });

    return (
        <div>
            <h1> Notes </h1>

            {/* <ul>
                    <li> {notes[0].content} </li>
                    <li> {notes[1].content} </li>
                    <li> {notes[2].content} </li>
                </ul> */}

            {/* fara sa hardcode-am */}
            {/* <ul>
                    {notes.map(note =>
                        <li key={note.id}>
                            {note.content}
                        </li>
                    )}
                </ul> */}

            {/* folosim <Note> */}
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>

            {/* daca am folosi .map() */}
            {/* <ul>
                    <li>{mapNotes.content}</li>
                </ul> */}
        </div>
    )
}

export default App