import { Part } from './Part';

export const Content = (props) => {

  console.log(props);
  return (
    <>
    {
      props.parts.map(prop => {
        return <Part key={prop.id} part={prop.name} exercises={prop.exercises} />
      })
    }
    </>
  );
};
