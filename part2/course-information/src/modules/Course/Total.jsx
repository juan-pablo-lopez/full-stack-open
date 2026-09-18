export const Total = ({parts}) => {
  const totalExercises = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div style={{ fontWeight: 'bold' }}>Total of exercises in the course: {totalExercises}.</div>
  );
};