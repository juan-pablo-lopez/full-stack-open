const Header = (props) => {

  console.log(props)
  return (
      <h1>{props.course}</h1>
  )
}

const Part =(props) => {

  console.log(props)
  return (
      <p>
        {props.part} {props.exercises}
      </p>
  )
}

const Content = (props) => {

  console.log(props)
  return (
    <>
    {
      props.parts.map(prop => {
        return <Part part={prop.name} exercises={prop.exercises} />
      })
    }
    </>
  )
}

const Total = (props) => {

  console.log(props)
  return (
    <p>Number of exercises {props.total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  let totalExercises = 0;
  parts.forEach(part => {
    totalExercises += part.exercises;
  });

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  )
}

export default App