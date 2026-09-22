import { useState, useEffect } from 'react'
import axios from 'axios';
import { Filter } from './components/Phonebook/Filter';
import { NewEntry } from './components/Phonebook/NewEntry';
import { ExistingEntries } from './components/Phonebook/ExistingEntries';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    console.log('Retrieving phonebook information.')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Phonebook information retrieved.');
        setPersons(response.data);
      });
  }, []);

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
    axios
      .post('http://localhost:3001/persons', entryObject)
      .then(response => {
        console.log('New entry saved in Phonebook.');
        console.log(response);
      });
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