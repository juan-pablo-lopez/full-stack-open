import { useState } from 'react'
import { Filter } from './components/Phonebook/Filter';
import { NewEntry } from './components/Phonebook/NewEntry';
import { ExistingEntries } from './components/Phonebook/ExistingEntries';

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
      <Filter
        filterText={filterText}
        handleChangeFilterText={handleChangeFilterText} />
      <NewEntry
        handleAddNewName={handleAddNewName}
        newName={newName}
        handleChangeNewName={handleChangeNewName}
        newNumber={newNumber}
        handleChangeNewNumber={handleChangeNewNumber}
      />
      <ExistingEntries
        personsToShow={personsToShow} />
    </div>
  )
}

export default App