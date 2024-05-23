import Course from "./components/Course";
import Header from "./components/Header";
import Total from "./components/Total";

export const App = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        const { id, name, parts } = course;
        return (
          <div key={id}>
            <Header course={name} />
            <Course parts={parts} />
            <Total parts={parts} />
          </div>
        );
      })}
    </>
  );
};
