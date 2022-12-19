import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.findIndex((person) => person.name === newName) === -1) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };
  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handleNewFilter = (e) => setFilter(e.target.value);

  const personsToShow = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleNewFilter} />
      <h2>Add a new</h2>
      <PersonForm
        inputs={[
          {
            text: "name",
            value: newName,
            onChange: handleNewName,
          },
          {
            text: "number",
            value: newNumber,
            onChange: handleNewNumber,
          },
        ]}
        button={{text: "add", onClick: addPerson}}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
