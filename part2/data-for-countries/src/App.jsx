import { useState, useEffect } from 'react';
import restcountriesService from './services/restcountries';
import { Filter } from './components/Data4Countries/Filter';
import { MatchingCountries } from './components/Data4Countries/MatchingCountries';
import { Country } from './components/Data4Countries/Country';
import { Notification } from './components/Notification/Notification';

const App = () => {
  const [notification, setNotification] = useState({'message': null, 'type': null});
  const [filterCountry, setFilterCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState('');

  useEffect(() => {
    console.log('Retrieving information for all countries.')
    setNotification({'message': 'Retrieving information for all countries.', 'type':'info'});
    restcountriesService
      .getAll()
      .then(response => {
        console.log('Information for all countries retrieved.');
        setAllCountries(response);
        setNotification({'message': 'Information for all countries retrieved.', 'type':'success'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
      })
      .catch(error => {
        setNotification({'message': 'An error happened while getting information for countries.', 'type':'error'});
        setTimeout(() => {setNotification({'message': null, 'type': null})}, 3500);
      });
  }, []);

  const filteredCountries = allCountries.filter(country => (
    country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
    || country.name.official.toLowerCase().includes(filterCountry.toLowerCase())));
  const countriesToShow = (filterCountry === '')
  ? 'Please use the filter to retrieve some countries.'
  : filteredCountries.length > 10
    ? `Too many matches (${filteredCountries.length}). Please specify another filter.`
    : filteredCountries;
  console.log('filteredCountries.length', filteredCountries.length);

  const handleChangeFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  };

  const handleSeeDetails = (country) => {
    setCountryDetails(country);
  };

  return (
    <div>
      <h2>Data for Countries</h2>
      <Notification message={notification['message']} type={notification['type']} />
      <Filter
        filterCountry={filterCountry}
        handleChangeFilterCountry={handleChangeFilterCountry} />
      <MatchingCountries
        countriesToShow={countriesToShow}
        handleSeeDetails={handleSeeDetails} />
      {
        countryDetails !== ''
        ? <Country country={countryDetails} />
        : ''
      }
    </div>
  )
}

export default App