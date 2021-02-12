import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
const App = () => {
    const [country, setCountry] = useState('');
    const [all, setAll] = useState([]);
    const [filter, setFilter] = useState([]);
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((res) => setAll(res.data));
    }, []);

    const handleCountry = (e) => {
        let newCountry = e.target.value;
        setCountry(newCountry);
        setFilter(
            all.filter((one) =>
                one.name.toLowerCase().includes(newCountry.toLowerCase())
            )
        );
    };

    return (
        <>
            <Filter
                country={country}
                filter={filter}
                handleCountry={handleCountry}
            />
        </>
    );
};

export default App;
