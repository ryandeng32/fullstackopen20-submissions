import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad }) => {
    const sum = good + neutral + bad;
    return (
        <div>
            <p>all {sum}</p>
            <p>average {(good - bad) / sum}</p>
            <p>positive {good / sum} %</p>
        </div>
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
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            {good + neutral + bad > 0 && (
                <Statistics good={good} neutral={neutral} bad={bad} />
            )}
            {good + neutral + bad === 0 && <p>No feedback</p>}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
