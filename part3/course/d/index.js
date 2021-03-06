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

// GET
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        console.log(`app.get('/api/notes'):`)
        console.log(notes);
        response.json(notes);
    })
})

// GET by ID
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
        .catch(error => next(error));
})

// POST
// app.post('/api/notes', (request, response) => {
app.post('/api/notes', (request, response, next) => {
    const body = request.body;

    // folosim validator built-in Mongoose
    // if (body.content === undefined) {
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })
    // }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    // using promise chaining
    // note.save()
    //     .then(savedNote => {
    //         response.json(savedNote.toJSON())
    //     })
    //     .catch(error => next(error));

    // using shorter promise chaining syntax
    // note.save()
    //     .then(savedNote => {
    //         return savedNote.toJSON()
    //     })
    //     .then(savedAndFormattedNote => {
    //         response.json(savedAndFormattedNote)
    //     })
    //     .catch(error => next(error));

    note.save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
            response.json(savedAndFormattedNote)
        })
        .catch(error => next(error));
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

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response
            .status(400)
            .send({
                error: "malformatted id"
            })
    }
    if (error.name === 'ValidationError') {
        return response
            .status(400)
            .json({
                error: error.message
            })
    }

    next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
