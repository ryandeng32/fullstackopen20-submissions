import React from 'react';
import DisplayCountry from './DisplayCountry';

const DisplayCountries = ({ shown, handleShow, show }) => {
    return shown.map((one, i) => {
        return (
            <div key={one.name}>
                <div>
                    {one.name}{' '}
                    <button onClick={() => handleShow(i)}>
                        {show[i] && 'unshow'}
                        {!show[i] && 'show'}
                    </button>
                </div>
                {show[i] && <DisplayCountry country={shown[i]} />}
            </div>
        );
    });
};

export default DisplayCountries;
