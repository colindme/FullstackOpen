const PersonTable = ({ filterFunc }) => {
  return <table>
    <tbody>
      {filterFunc().map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
    </tbody>
  </table>
}

export default PersonTable