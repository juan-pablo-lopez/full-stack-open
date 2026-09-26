import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook';
import { Filter } from './components/Phonebook/Filter';
import { NewEntry } from './components/Phonebook/NewEntry';
import { ExistingEntries } from './components/Phonebook/ExistingEntries';
import { Notification } from './components/Notification/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    console.log('Retrieving phonebook information.')
    setNotification({'message': 'Retrieving phonebook information.', 'type':'info'});
    phonebookService
      .getAll()
      .then(response => {
        console.log('Phonebook information retrieved.');
        setPersons(response);
        setNotification({'message': 'Phonebook information retrieved.', 'type':'success'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
      })
      .catch(error => {
        setNotification({'message': 'An error happened while getting the existing entries.', 'type':'error'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
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
          setNotification({'message': `New number saved in existing Phonebook entry (${entryObject.name}).`, 'type':'success'});
          setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
        })
        .catch(error => {
          setNotification({'message': `Bad Request: ${error.response.data.error.join(' - ')}`, 'type':'error'});
          setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
        });
    } else {
      phonebookService
        .create(entryObject)
        .then(response => {
          console.log('New entry saved in Phonebook.');
          console.log(response);
          setPersons(persons.concat(response));
          setNotification({'message': `New entry for ${entryObject.name} saved in Phonebook.`, 'type':'success'});
          setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
        })
        .catch(error => {
          setNotification({'message': `Bad Request: ${error.response.data.error.join(' - ')}`, 'type':'error'});
          setTimeout(() => {setNotification({'message': null, 'type': null})}, 5000);
        });
    }
    setNewNumber('');
    setNewName('');
  };

  const handleRemoveEntry = (id, name) => {
    if (!window.confirm(`Remove '${name}' entry?`)) {
      return;
    }

    phonebookService
      .remove(id)
      .then(response => {
        console.log('Phonebook entry removed. ', response);
        setPersons(persons.filter(person => person.id !== id));
        setNotification({'message': `Phonebook entry for ${name} removed.`, 'type':'success'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
      })
      .catch(error => {
        setNotification({'message': `An error happened while removing entry for ${name}.`, 'type':'error'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification['message']} type={notification['type']} />
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