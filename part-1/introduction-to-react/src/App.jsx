const Header = ({ course }) => <h1>{course}</h1>;

const Course = ({ course }) => {
  return (
    <>
      {course.parts.map(({ name, exercises }) => {
        return (
          <div key={course.id}>
            {name} {exercises}
          </div>
        );
      })}
    </>
  );
};

/*/const Part = ({ part, exercises }) => (
  <p>
    {" "}
    {part}
    {exercises}
  </p>
);/*/

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <b>total of {total} exercises</b>;
};

export const App = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Course course={course} />
      <Total parts={course.parts} />
    </div>
  );
};
