import React from 'react';
import DisplayCountry from './DisplayCountry';

const Filter = ({ country, filter, handleCountry }) => {
    let result;
    if (!country || filter.length > 10) {
        result = 'Too many matches, specify another filter';
    } else if (filter.length == 1) {
        result = <DisplayCountry country={filter[0]} />;
    } else if (filter.length > 0) {
        result = filter.map((one, i) => {
            return <div key={one.name}>{one.name}</div>;
        });
    } else {
        result = 'No country found';
    }
    return (
        <>
            <div>
                find countries{' '}
                <input value={country} onChange={handleCountry} />
            </div>
            {result}
        </>
    );
};

export default Filter;
