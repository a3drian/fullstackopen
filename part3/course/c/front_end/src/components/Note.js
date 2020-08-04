import React from 'react'

const Note = ({ note, toggleImportance }) => {

    // e importanta in functie de proprietatea "important"
    const label = note.important ? 'not important' : 'important';

    return (
        <li className="note">
            {note.content}
            <button onClick={toggleImportance}>
                {label}
            </button>
        </li>
    )
}

export default Note;