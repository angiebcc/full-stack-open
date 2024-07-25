import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import personService from "./services/persons";
import "./App.css";

const PersonList = ({ persons, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <PersonListItem
            key={person.id}
            person={person}
            deletePerson={deletePerson}
          />
        ))}
      </ul>
    </>
  );
};

const PersonListItem = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.phone}
      <button onClick={() => deletePerson(person)}>Delete </button>
    </li>
  );
};

const PersonForm = ({
  newPerson,
  handleInputChange,
  addPerson,
  updateNumber,
}) => {
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
            type="number"
            id="phone"
            name="phone"
            value={newPerson.phone}
            onChange={handleInputChange}
          />
        </div>

        <br />

        <button type="submit">Save</button>
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
  const [message, setMessage] = useState("");
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewPerson((person) => {
      return { ...person, [name]: value };
    });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    const isUpdatingExistingPerson =
      existingPerson && existingPerson.phone !== newPerson.phone;

    if (!isUpdatingExistingPerson) {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewPerson(emptyPerson);
          setMessage(`Successfully added ${newPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          setMessage(`Error adding person ${newPerson.name}`);
        });

      return;
    }

    const shouldSubmitUpdatedPerson = window.confirm(
      `${newPerson.name} is already added to the phonebook. Replace the old number with a new one?`
    );

    if (!shouldSubmitUpdatedPerson) {
      return;
    }

    const updatedPerson = {
      ...existingPerson,
      phone: newPerson.phone,
    };

    personService
      .update(existingPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id ? returnedPerson : person
          )
        );

        setNewPerson(emptyPerson);
        setMessage(`Number of ${newPerson.name} is changed`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        setMessage(
          `Information of ${newPerson.name} has already been removed from server`
        );
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.error("Failed to delete person:", error);
        });
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="error">{message}</div>;
  };

  return (
    <div>
      <Notification message={message} />
      <InputFilter value={search} setSearch={setSearch} />

      <br />
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleInputChange={handleInputChange}
      />

      <PersonList
        persons={
          search === ""
            ? persons
            : persons.filter((person) =>
                person.name.toUpperCase().includes(search.toUpperCase())
              )
        }
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
