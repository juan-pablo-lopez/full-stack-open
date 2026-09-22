import { useEffect } from 'react';
import { Country } from './Country';

export const MatchingCountries = ({ countriesToShow, handleSeeDetails }) => {

  useEffect(() => {
    if (Array.isArray(countriesToShow) && countriesToShow.length === 1) {
      handleSeeDetails('');
    }
  }, [countriesToShow, handleSeeDetails]);

  return (
    <>
      <h2>Matching Countries</h2>
      <div>
        {Array.isArray(countriesToShow) ? (
          countriesToShow.length > 1 ? (
            <ul>
              {countriesToShow.map((country) => (
                <li key={country.tld[0]}>
                  {country.name.common} ({country.name.official}){' '}
                  <a href="#" onClick={(event) => {
                    event.preventDefault();
                    handleSeeDetails(country);
                  }}>See details</a>
                </li>
              ))}
            </ul>
          ) : countriesToShow.length === 1 ? (
            <Country country={countriesToShow[0]} />
          ) : (
            <p>No countries found with selected filter.</p>
          )
        ) : typeof countriesToShow === 'string' ? (
          <p>{countriesToShow}</p>
        ) : (
          <p>Something weird happened here.</p>
        )}
      </div>
    </>
  );
};