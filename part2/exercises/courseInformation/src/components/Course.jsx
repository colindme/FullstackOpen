const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = ({ name }) => {
  return <h2>{name}</h2>
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}> /</Part>)}
    </>
  )
}

const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum += part.exercises, 0)
  return <p><b>Total number of exercises: {total}</b></p>
}

export default Course