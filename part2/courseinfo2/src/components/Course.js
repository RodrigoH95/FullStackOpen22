import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <ul>
      {course.map((course) => (
        <div key={course.id}>
          <Header courseName={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </ul>
  );
};

export default Course;
