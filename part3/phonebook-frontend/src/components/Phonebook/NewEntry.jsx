export const NewEntry = ({
  handleAddNewName,
  newName,
  handleChangeNewName,
  newNumber,
  handleChangeNewNumber
}) => {
  return (
    <>
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
    </>
  );
};