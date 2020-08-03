const express = require('express')
const cors = require('cors') // permite request-uri de la alta origine

const app = express()

app.use(cors())
// pentru adaugare prin POST
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

// routes
// app.get('/', (request, response) => {
//     response.send('<h1>Hello aditza!</h1>')
// })

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// Fetching a single resource
// exemplu mic de closure: functia de find() vede "id"
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('id:', id)

    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id);
        return note.id === id
    })
    // const note = notes.find(note => note.id === id);
    console.log('note:', note)

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }

})

// vom forta utilizatorii sa trimita un note cu proprietatea "content" completata
// altfel, trimitem un 400 => BAD REQUEST
/*
app.post('/api/notes', (request, response) => {

    const note = request.body;
    console.log('note:', note);

    note.id = generateId;
    notes.concat(note);

    response.json(note);
})
*/

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0;

    console.log(...notes.map(n => n.id));

    return maxId + 1;
}

app.post('/api/notes', (request, response) => {

    const body = request.body;
    console.log('body:', body);

    if (!body.content) {
        return response.status(400).json({
            error: '"content" missing in the body of the note'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note);
    console.log('note:', note);

    console.log(notes);

    response.json(note);
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('id:', id)

    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})