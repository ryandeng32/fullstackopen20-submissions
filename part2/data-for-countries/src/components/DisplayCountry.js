import React from 'react';

const DisplayCountry = ({ country }) => {
    return (
        <>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>lanugages</h2>
            <ul>
                {country.languages.map((language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <img
                style={{ width: '100px' }}
                src={country.flag}
                alt={`flag for ${country.name}`}
            />
        </>
    );
};

export default DisplayCountry;
