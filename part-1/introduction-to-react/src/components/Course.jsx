import React from "react";

const Course = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exercises }) => {
        return (
          <div key={name}>
            {name} {exercises}
          </div>
        );
      })}
    </>
  );
};

export default Course;
