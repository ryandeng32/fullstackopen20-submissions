import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const display = filter
        ? persons.filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
          )
        : persons;

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                window.alert(`${newName} is already added to phonebook`);
                return;
            }
        }
        setPersons(persons.concat({ name: newName, number: newNumber }));
        setNewName('');
        setNewNumber('');
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />

            <h2>add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                handleSubmit={handleSubmit}
            />
            <h2>Numbers</h2>
            <Person persons={display} />
        </div>
    );
};

export default App;
