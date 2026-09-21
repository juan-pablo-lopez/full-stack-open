import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');

  const personsToShow = filterText === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()));

  const handleChangeFilterText = (event) => {
    setFilterText(event.target.value);
  };

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
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
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
      <div>
        Filter: <input value={filterText} onChange={handleChangeFilterText} />
      </div>
      <hr />
      <h2>New entry</h2>
      <form onSubmit={handleAddNewName}>
        <div>
          Name: <input value={newName} onChange={handleChangeNewName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleChangeNewNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <hr />
      <h2>Existing entries</h2>
      <div>
        <ul>
          { personsToShow.map(person => 
              <li key={person.id}>{person.name}: {person.number}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default App