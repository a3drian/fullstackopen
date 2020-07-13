import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {

  console.log("Header")
  console.log(props)

  return (
    // 1.1-1.4
    // <h1>{props.course}</h1>

    // 1.5
    <h1>{props.course}</h1>
  )
}

// 1.1
// const Content = (props) => {
//   return (
//     <p>
//       {props.part} {props.exercises}
//     </p>
//   )
// }

// 1.2
const Part = (props) => {
  console.log("Part")
  console.log(props)
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

// const Content = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <Part part={props.part[0]} exercises={props.exercises[0]} />
//       <Part part={props.part[1]} exercises={props.exercises[1]} />
//       <Part part={props.part[2]} exercises={props.exercises[2]} />
//     </div>
//   )
// }
// 1.2

// 1.3-1.5
const Content = (props) => {
  console.log("Content")
  console.log(props)
  // 1.3-1.4
  // const content = props.content
  // 1.5
  console.log(props.content.parts)
  const content = props.content.parts
  return (
    <div>
      <Part part={content[0].name} exercises={content[0].exercises} />
      <Part part={content[1].name} exercises={content[1].exercises} />
      <Part part={content[2].name} exercises={content[2].exercises} />
    </div>
  )
}

// 1.2
// const Total = (props) => {
//   console.log(props)
//   return (
//     <p>
//       Number of exercises {props.total}
//     </p>
//   )
// }

// 1.3-1.5
const Total = (props) => {
  console.log("Total")
  console.log(props)
  // 1.3-1.4
  // const content = props.content
  // 1.5
  console.log(props.content.parts)
  const content = props.content.parts
  let s = 0
  content.forEach(element => {
    s += element.exercises
  });
  return (
    <p>
      Number of exercises {s}
    </p>
  )
}

const App = () => {
  // 1.1, 1.2
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  // const parts = [part1, part2, part3]
  // const exercises = [exercises1, exercises2, exercises3]

  // 1.3
  // const course = 'Half Stack application development'
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  // const content = [part1, part2, part3]

  // 1.4
  // const course = 'Half Stack application development'
  // const content = [{
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // },
  // {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }, {
  //   name: 'State of a component',
  //   exercises: 14
  // }]

  // 1.5 a single object
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
    <div>
      <Header course={course.name} />

      {/* 1.2 */}
      {/* <Content part={parts} exercises={exercises} /> */}
      {/* <Total total={exercises1 + exercises2 + exercises3} /> */}

      {/* 1.3-1.5 */}
      <Content content={course} />
      <Total content={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))