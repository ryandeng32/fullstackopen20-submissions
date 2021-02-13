import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DisplayCountry = ({ country }) => {
    const { name, capital, population, languages, flag } = country;
    const [weather, setWeather] = useState({});
    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
            )
            .then((res) => {
                console.log(res.data);
                setWeather(res.data.current);
            });
    }, []);

    return (
        <>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h2>lanugages</h2>
            <ul>
                {languages.map((language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <img
                style={{ width: '100px' }}
                src={flag}
                alt={`flag for ${name}`}
            />
            {weather && (
                <>
                    <h2>Weather in {capital}</h2>
                    <p>temperature: {weather.temperature}</p>
                    {weather.weather_icons && (
                        <img
                            style={{ width: '100px' }}
                            src={weather.weather_icons[0]}
                            alt="weather_icon"
                        />
                    )}
                    <p>
                        wind: {weather.wind_speed} mph direction{' '}
                        {weather.wind_dir}
                    </p>
                </>
            )}
        </>
    );
};

export default DisplayCountry;
