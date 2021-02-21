import React from 'react';

const Person = ({ persons, handleDelete }) => {
    return (
        <>
            {persons.map((person) => (
                <p key={person.name}>
                    {person.name} {person.phone}{' '}
                    <button onClick={() => handleDelete(person.id)}>
                        delete
                    </button>
                </p>
            ))}
        </>
    );
};

export default Person;
