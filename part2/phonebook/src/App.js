import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(persons => setPersons(persons));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addMessage = message => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 2500);
  }

  const addPerson = (e) => {
    e.preventDefault();
    const index = persons.findIndex((person) => person.name === newName);
    if (index === -1) {
      personService.createPerson({name: newName, number: newNumber}).then(person => {
        setPersons(persons.concat(person));
        addMessage(`Success - ${person.name} added to phonebook!`);
      });
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace number?`)) {
        personService.updatePerson(persons[index].id, {...persons[index], number: newNumber})
          .then(person => {
            addMessage(`Success - Updated ${person.name}'s number`);
            const copy = [...persons];
            copy[index] = person;
            setPersons(copy);
        })
        .catch(err => {
          addMessage(`Error - ${newName} information was not found on the server`, err);
        })
      };
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => personService.deletePerson(id).then(person => {
    addMessage("Success - Person deleted from phonebook");
    setPersons(persons.filter(person => person.id !== id))
  })
  .catch(err => {
    addMessage("Error - Delete operation failed. Person was not found on the server")
  });

  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handleNewFilter = (e) => setFilter(e.target.value);

  const personsToShow = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
