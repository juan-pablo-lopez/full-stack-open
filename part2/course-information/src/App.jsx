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
        return <Part key={prop.id} part={prop.name} exercises={prop.exercises} />
      })
    }
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
};

export default App