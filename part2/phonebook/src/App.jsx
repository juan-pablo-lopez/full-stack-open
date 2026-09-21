import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');

  const handleChangeNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNewName = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`'${newName}' is already in the phonebook`);
      return;
    }

    const entryObject = {
      name: newName,
      id: String(persons.length + 1)
    };
    setPersons(persons.concat(entryObject));
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {
            persons.map(person => 
              <li key={person.id}>{person.name}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default App