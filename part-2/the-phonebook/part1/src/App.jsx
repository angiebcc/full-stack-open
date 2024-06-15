import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Person = ({ person }) => {
  return <>{person.content}</>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      content: newName,
      important: Math.random() < 0.5,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const person = allPersons.filter((person) => {
    person.name === newName;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </>
      <form onSubmit={addName}>
        <input value={newName} onChange={handleNameChange} />
        <button type="submit">save</button>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  );
};

export default App;
