export const Filter = ({filterCountry, handleChangeFilterCountry}) => {
  return (
    <>
      <div>
        Find Countries: <input value={filterCountry} onChange={handleChangeFilterCountry} />
      </div>
      <hr />
    </>
  );
};