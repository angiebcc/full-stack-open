import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const PersonList = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <PersonListItem key={person.id} person={person} />
        ))}
      </ul>
    </>
  );
};

const PersonListItem = ({ person }) => {
  return (
    <li>
      {person.name} {person.phone}
    </li>
  );
};

const PersonForm = ({ newPerson, handleInputChange, addPerson }) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newPerson.name}
            onChange={handleInputChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={newPerson.phone}
            onChange={handleInputChange}
          />
        </div>

        <br />

        <button type="submit">save</button>
      </form>
    </>
  );
};

const InputFilter = ({ search, setSearch }) => {
  return (
    <>
      <h2>Phonebook</h2>

      <div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search by name"
        />
      </div>
    </>
  );
};

const emptyPerson = { name: "", phone: "" };

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newPerson, setNewPerson] = useState(emptyPerson);
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewPerson((person) => {
      return { ...person, [name]: value };
    });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const hasAlreadyAddedPerson = persons.some(
      (person) => person.name === newPerson.name
    );

    if (hasAlreadyAddedPerson) {
      window.alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ ...newPerson, id: persons.length + 1 }));
    setNewPerson(emptyPerson);
  };

  return (
    <div>
      <InputFilter value={search} setSearch={setSearch} />

      <br />
      <PersonForm
        newPerson={newPerson}
        handleInputChange={handleInputChange}
        addPerson={addPerson}
      />

      <PersonList
        persons={
          search === ""
            ? persons
            : persons.filter((person) =>
                person.name.toUpperCase().includes(search.toUpperCase())
              )
        }
      />
    </div>
  );
};

export default App;
