import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook';
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
    phonebookService
      .getAll()
      .then(response => {
        console.log('Phonebook information retrieved.');
        setPersons(response);
      })
      .catch(error => {
        alert("An error happened while getting the existing entries. ", error);
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

    const entryObject = {
      name: newName,
      number: newNumber
    };

    const existingEntry = persons.findLast(person => person.name.toLowerCase() === newName.toLowerCase());
    if (existingEntry !== undefined) {
      if (!window.confirm(`'${newName}' already exists. Replace the old number with a new one?`)) {
        return;
      }
      phonebookService
        .update(existingEntry.id, entryObject)
        .then(response => {
          console.log('New number saved in existing Phonebook entry.');
          console.log(response);
          setPersons(persons.map(person => 
            person.id === existingEntry.id ? response : person
          ));
        })
        .catch(error => {
          alert("An error happened while creating the entry. ", entryObject, error);
        });
    } else {
      phonebookService
        .create(entryObject)
        .then(response => {
          console.log('New entry saved in Phonebook.');
          console.log(response);
          setPersons(persons.concat(response));
        })
        .catch(error => {
          alert("An error happened while creating the entry. ", entryObject, error);
        });
    }
    setNewNumber('');
    setNewName('');
  };

  const handleRemoveEntry = (id, name) => {
    if (!window.confirm(`Remove '${name}'?`)) {
      return;
    }

    phonebookService
      .remove(id)
      .then(response => {
        console.log('Phonebook entry removed. ', response);
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert("An error happened while removing the selected entry. ", error);
      });
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
        personsToShow={personsToShow}
        handleRemoveEntry={handleRemoveEntry} />
    </div>
  )
}

export default App