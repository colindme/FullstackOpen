import axios from 'axios'

const url = `http://localhost:3001/persons`

const getAllPeople = () =>  {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addNewPerson = person => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const deletePerson = person => {
    const request = axios.delete(`${url}/${person.id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, person) => {
    const request = axios.put(`${url}/${id}`, person)
    return request.then(response => response.data)
}

export default { getAllPeople, addNewPerson, deletePerson, updatePerson }