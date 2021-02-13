import React from 'react';
import DisplayCountries from './DisplayCountries';
import DisplayCountry from './DisplayCountry';

const Filter = ({ show, setShow, filter, handleFilter, shown }) => {
    let result;
    const handleShow = (i) => {
        let newShow = [...show];
        newShow[i] = !show[i];
        setShow(newShow);
    };
    if (!filter || shown.length > 10) {
        result = 'Too many matches, specify another filter';
    } else if (shown.length == 1) {
        result = <DisplayCountry country={shown[0]} />;
    } else if (shown.length > 0) {
        result = (
            <DisplayCountries
                shown={shown}
                handleShow={handleShow}
                show={show}
            />
        );
    } else {
        result = 'No country found';
    }
    return (
        <>
            <div>
                find countries <input value={filter} onChange={handleFilter} />
            </div>
            {result}
        </>
    );
};

export default Filter;
