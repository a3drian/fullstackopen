import React from 'react'

const Note = ({ note, toggleImportance, deleteNote }) => {

    // e importanta in functie de proprietatea "important"
    const label = note.important ? 'not important' : 'important';

    return (
        <li className="note">
            {note.content}
            <button onClick={toggleImportance}>
                {label}
            </button>
            <button onClick={deleteNote}>
                delete
            </button>
        </li>
    )
}

export default Note;