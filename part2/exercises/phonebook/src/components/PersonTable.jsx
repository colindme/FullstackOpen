const PersonTable = ({ filterFunc, deleteBackendFunc }) => {

  const handleOnDelete = (event, person) => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete ${person.name}?`))
    {
      deleteBackendFunc(person)
    }
  }

  return <table>
    <tbody>
      {filterFunc().map(person => 
        <tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td><form onSubmit={(event) => handleOnDelete(event, person)}><button type="submit">Delete person</button></form></td>
        </tr>)}
    </tbody>
  </table>
}

export default PersonTable