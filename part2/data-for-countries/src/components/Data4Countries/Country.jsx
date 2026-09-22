export const Country = ({country}) => {
  return (
    <>
      <h3>{country.name.common}</h3>
      <div><span style={{fontWeight: 'bold'}}>Official Name</span>: {country.name.official}</div>
      <div><span style={{fontWeight: 'bold'}}>Capital</span>: {country.capital[0]}</div>
      <div><span style={{fontWeight: 'bold'}}>Area</span>: {country.area}</div>
      <div><span style={{fontWeight: 'bold'}}>Languages</span>:
        <ul>
        {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>
            <strong>{code.toUpperCase()}:</strong> {name}
            </li>
        ))}
        </ul>
      </div>
      <div><img 
        src={country.flags.png}
        alt='Flag'
      /></div>
    </>
  );
};