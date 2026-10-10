import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonTable from './components/PersonTable'

const App = () => {
  useEffect(() => {
    phonebookService.getAllPeople().then(initialPersons => setPersons(initialPersons))
  }, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const personIndex = persons.findIndex(element => element.name.toLowerCase() === newName.toLowerCase())
    if (personIndex != -1) {
      if (persons[personIndex].number == newNumber)
      {
        // number already matches, no reason to replace
        return;
      }
      if (!window.confirm(`${newName} already exists in the phonebook, would you like to update their number?`))
      {
        return
      }
      else
      {
        phonebookService.updatePerson(persons[personIndex].id, newPerson)
          .then(updateResponse => {
            setPersons(persons.map(person => person.id == updateResponse.id ? updateResponse : person))
            setNewName("")
            setNewNumber("")
          })
      }
    }
    else
    {
      phonebookService.addNewPerson(newPerson)
        .then(newPersonResponse => {
          setPersons(persons.concat(newPersonResponse))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const handleOnDelete = personToDelete => {
    phonebookService.deletePerson(personToDelete)
      .then(deleteResponse => {
        setPersons(persons.filter(person => person.id != deleteResponse.id))
      })
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
      <PersonTable filterFunc={filterNamesDown} deleteBackendFunc={handleOnDelete} />
    </div>
  )
}

export default App