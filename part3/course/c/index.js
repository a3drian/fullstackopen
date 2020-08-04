require('dotenv').config();
console.log(require('dotenv').config());

const express = require('express')
const app = express()

const cors = require('cors') // permite request-uri de la alta origine

const Note = require('./models/note')   // conectarea la Mongoose

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}
app.use(requestLogger);

/*
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]
*/

// GET
// le vom prelua direct din baza de date
// app.get('/api/notes', (request, response) => {
//     response.json(notes)
// })

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        console.log(`app.get('/api/notes'):`)
        console.log(notes);
        response.json(notes);
    })
})

// vom folosi modelul de Note din note.js
// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     console.log('id:', id)

//     const note = notes.find(note => {
//         console.log(note.id, typeof note.id, id, typeof id, note.id === id);
//         return note.id === id
//     })
//     console.log('note:', note)

//     if (note) {
//         response.json(note);
//     } else {
//         response.status(404).end();
//     }

// })

// GET by ID

// introducing error handling
// app.get('/api/notes/:id', (request, response) => {
//     Note.findById(request.params.id).then(note => {
//         response.json(note.toJSON())
//     });
// })

// app.get('/api/notes/:id', (request, response) => {
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note.toJSON());
            } else {
                response.send("<h1>404</h>");
                response.status(404).end();
            }
        })
        // .catch(error => {
        //     console.log(error);

        //     // response.send("<h1>500</h>");
        //     // response.status(500).end();
        //     // vom folosi un handler pentru cazul in care "id" nu vine formatat corespunzator
        //     response.status(400).send({
        //         error: 'malformatted id'
        //     })
        // });
        .catch(error => next(error));
})

// POST

// nu mai generam noi id, il genereaza Mongo
// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => n.id))
//         : 0;

//     console.log(...notes.map(n => n.id));

//     return maxId + 1;
// }

// app.post('/api/notes', (request, response) => {

//     const body = request.body;
//     console.log('body:', body);

//     if (!body.content) {
//         return response.status(400).json({
//             error: '"content" missing in the body of the note'
//         })
//     }

//     const note = {
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//         id: generateId(),
//     }

//     notes = notes.concat(note);
//     console.log('note:', note);

//     console.log(notes);

//     response.json(note);
// })

app.post('/api/notes', (request, response) => {
    const body = request.body;
    
    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

// UPDATE

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

// DELETE
// folosim findByIdAndRemove()
// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     console.log('id:', id)

//     let updatedNotes = [];
//     Note.find({}).then((notes) => {
//         console.log(`app.delete('/api/notes/:id'):`)
//         console.log(notes);
//         updatedNotes = notes;
//     })
//     updatedNotes = updatedNotes.filter(note => note.id !== id)

//     response.status(204).end()
// })

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error =>
            next(error))
})

const unknownEndpoint = (request, response) => {
    console.log('unknown endpoint middleware');
    response.status(404).send({
        error: 'unknown endpoint'
    });
}
app.use(unknownEndpoint);

// error handler
const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response
            .status(400)
            .send({
                error: "malformatted id"
            })
    }

    next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
