import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonTable from './components/PersonTable'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault()

    if (persons.findIndex(element => element.name.toLowerCase() === newName.toLowerCase()) != -1) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    console.log("adding new note")
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterOnChange = (event) => {
    setNameFilter(event.target.value)
  }

  const filterNamesDown = () => {
    if (!nameFilter) return persons
    return persons.filter(person => person.name.toLowerCase().includes(nameFilter))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleFilterOnChange} />
      <h2>Add new person to phonebook:</h2>
      <PersonForm newName={newName} newNumber={newNumber} onNameChange={handleNameOnChange} onNumberChange={handleNumberOnChange} onSubmit={handleOnSubmit} />
      <h2>Numbers</h2>
      <PersonTable filterFunc={filterNamesDown} />
    </div>
  )
}

export default App