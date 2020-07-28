import axios from 'axios'
const baseURL = 'http://localhost:3001/notes'

const GetAll = () => {
    const request = axios.get(baseURL); // pentru ca avem nevoie doar de "response.data"
    return request.then(response => {
        return response.data
    })
}

const Create = (newObject) => {
    const request = axios.post(baseURL, newObject);
    return request.then(response => response.data)
}

const Update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data)
}

// returneaza o "note" care nu exista in server
const GetAllFail = () => {
    const request = axios.get(baseURL)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
}

// GetAll = ce se exporta
// getAll = cu ce facem legatura cu ce se exporta si proprietate din note.js
// export default {
//     GetAll: getAll,
//     Create: create,
//     Update: update
// }

// am redenumit direct functiile cu litera mare
export default { GetAll, Create, Update, GetAllFail }