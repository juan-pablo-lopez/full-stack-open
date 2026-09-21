export const ExistingEntries = ({personsToShow}) => {
  return (
    <>
      <h2>Existing entries</h2>
      <div>
        <ul>
          { 
            personsToShow.map(person => 
              <li key={person.id}>{person.name}: {person.number}</li>
            )
          }
        </ul>
      </div>
    </>
  );
};