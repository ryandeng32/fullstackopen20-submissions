import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import service from './service/persons';
import Notification from './components/Notification';
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        message: null,
        type: 'success',
    });
    useEffect(() => {
        service.getAll().then((res) => setPersons(res));
    }, []);

    const display = filter
        ? persons.filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
          )
        : persons;

    const setMessage = ({ message, type }) => {
        setErrorMessage({ message, type });
        setTimeout(() => {
            setErrorMessage({ ...errorMessage, message: null });
        }, 3000);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                if (
                    window.confirm(
                        `${newName} is already added to phonebook, replace the old phone with a new one?`
                    )
                ) {
                    service
                        .update(persons[i].id, {
                            name: newName,
                            phone: newNumber,
                        })
                        .then((res) =>
                            setPersons(
                                persons.map((person) =>
                                    person.id === persons[i].id ? res : person
                                )
                            )
                        )
                        .catch((error) => {
                            setMessage({
                                message: error.response.data.error,
                                type: 'error',
                            });
                        });
                    setNewName('');
                    setNewNumber('');
                }
                return;
            }
        }
        service
            .create({ name: newName, phone: newNumber })
            .then((res) => {
                setPersons(persons.concat(res));
                setMessage({ message: `added ${newName}`, type: 'success' });
            })
            .catch((error) => {
                setMessage({
                    message: error.response.data.error,
                    type: 'error',
                });
            });
        setNewName('');
        setNewNumber('');
    };

    const handleDelete = (id) => {
        service.remove(id).catch(() => {
            setMessage({ message: 'already deleted', type: 'error' });
        });
        setPersons(persons.filter((person) => person.id !== id));
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={errorMessage} />
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
            <Person persons={display} handleDelete={handleDelete} />
        </div>
    );
};

export default App;
