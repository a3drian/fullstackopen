import axios from 'axios'
const baseURL = '/api/notes'
console.log(baseURL);

const GetAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const Create = (newObject) => {
    const request = axios.post(baseURL, newObject);
    return request.then(response => response.data);
}

const Update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
}

const Delete = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

// am redenumit direct functiile cu litera mare
export default { GetAll, Create, Update, Delete }