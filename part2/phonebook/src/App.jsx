import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleChangeNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddNewName = (event) => {
    event.preventDefault();

    // There is no indication to validate a new
    // number exists, so not checking that now.
    if (persons.some(person => person.name === newName)) {
      alert(`'${newName}' is already in the phonebook`);
      return;
    }

    const entryObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(entryObject));
    setNewNumber('');
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewName}>
        <div>
          name: <input value={newName} onChange={handleChangeNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {
            persons.map(person => 
              <li key={person.id}>{person.name}: {person.number}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default App