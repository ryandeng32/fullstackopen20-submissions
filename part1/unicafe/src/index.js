import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};
const Statistics = ({ good, neutral, bad }) => {
    const sum = good + neutral + bad;
    return (
        <table>
            <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="all" value={sum} />
                <Statistic text="average" value={(good - bad) / sum} />
                <Statistic text="positive" value={`${(100 * good) / sum} %`} />
            </tbody>
        </table>
    );
};
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={'good'} onClick={() => setGood(good + 1)} />
            <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} />
            <Button text={'bad'} onClick={() => setBad(bad + 1)} />

            <h1>statistics</h1>
            {good + neutral + bad > 0 && (
                <Statistics good={good} neutral={neutral} bad={bad} />
            )}
            {good + neutral + bad === 0 && <p>No feedback</p>}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
