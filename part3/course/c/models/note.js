const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false) // scapam de eroarea legata findByIdAndUpdate()

// const url = `mongodb+srv://adrian:ZbURtGAc1OBAIbYN@cluster0.qyqtz.mongodb.net/note-app?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
