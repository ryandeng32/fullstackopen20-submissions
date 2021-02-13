import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
const App = () => {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [shown, setShown] = useState([]);
    const [show, setShow] = useState([]);
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((res) => setData(res.data));
    }, []);

    const handleFilter = (e) => {
        let newFilter = e.target.value;
        setFilter(newFilter);
        let newShown = data.filter((country) =>
            country.name.toLowerCase().includes(newFilter.toLowerCase())
        );
        setShown(newShown);
        setShow(new Array(newShown.length).fill(false));
    };

    return (
        <>
            <Filter
                show={show}
                setShow={setShow}
                filter={filter}
                handleFilter={handleFilter}
                shown={shown}
            />
        </>
    );
};

export default App;
