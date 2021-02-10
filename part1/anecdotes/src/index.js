import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
    const len = anecdotes.length;
    const [selected, setSelected] = useState(0);
    const [mostVoted, setMostVoted] = useState(0);
    const [vote, setVote] = useState(new Array(len).fill(0));
    const chooseNext = () => {
        setSelected(Math.floor(Math.random() * len));
    };
    const clickVote = () => {
        let newVote = [...vote];
        newVote[selected] += 1;
        if (newVote[selected] > newVote[mostVoted]) {
            setMostVoted(selected);
        }
        setVote(newVote);
    };
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {vote[selected]} votes</p>
            <button onClick={clickVote}>vote</button>
            <button onClick={chooseNext}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVoted]}</p>
            <p>has {vote[mostVoted]} votes</p>
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
