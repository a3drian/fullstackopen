import axios from 'axios'
const baseURL = '/api/notes'
console.log(baseURL);

const GetAll = () => {
    const request = axios.get(baseURL); // pentru ca avem nevoie doar de "response.data"
    return request.then(response => response.data)
}

const Create = (newObject) => {
    const request = axios.post(baseURL, newObject);
    return request.then(response => response.data)
}

const Update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

// am redenumit direct functiile cu litera mare
export default { GetAll, Create, Update }