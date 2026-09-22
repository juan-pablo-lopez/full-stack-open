export const ExistingEntries = ({personsToShow, handleRemoveEntry}) => {
  return (
    <>
      <h2>Existing entries</h2>
      <div>
        <ul>
          { 
            personsToShow.map(person => 
              <li key={person.id}>{person.name}: {person.number}{' '}
                <a href="#" onClick={() => handleRemoveEntry(person.id, person.name)}>Remove</a>
              </li>
            )
          }
        </ul>
      </div>
    </>
  );
};