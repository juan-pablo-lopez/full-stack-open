import { Header } from './Header';
import { Content } from './Content';
import { Total } from './Total';

export const Course = ({course}) => {
  return (
    <>
      <hr style={{ border: 'none', borderTop: 'silver 1px dotted' }} />
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};