import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                window.alert(`${newName} is already added to phonebook`);
                return;
            }
        }
        setPersons(persons.concat({ name: newName }));
        setNewName('');
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleClick} type="submit">
                        add
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <p key={person.name}>{person.name}</p>
            ))}
        </div>
    );
};

export default App;
