import React from 'react';
import './index.css';
const Notification = ({ notification }) => {
    const { message, type } = notification;
    if (message === null) {
        return null;
    }
    return <div className={type}>{message}</div>;
};

export default Notification;
