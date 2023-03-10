import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <>
  <h1>{props.course}</h1>
  </>
)

const Content = (props) => (
  <>
    {props.parts.map(part => <p>{part.name} {part.exercises}</p>)}
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.parts.map(part => part.exercises).reduce((acc, part) => acc + part)}</p>
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))