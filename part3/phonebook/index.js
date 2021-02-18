const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(
    morgan(function (tokens, req, res) {
        let tokenList = [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
        ];
        if (tokens.method(req, res) === 'POST') {
            tokenList = tokenList.concat(JSON.stringify(req.body));
        }
        return tokenList.join(' ');
    })
);

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122',
    },
];
app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((person) => person.id === id);
    if (!person) {
        return res.status(404).json({ error: 'no person found' });
    }
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'no name or number provided' });
    }
    if (persons.find((person) => person.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const person = {
        id: Math.floor(Math.random(1000) * 1000),
        name: body.name,
        number: body.number,
    };
    persons = persons.concat(person);
    res.json(person);
});
app.get('/info', (req, res) => {
    res.send(`<p>phonebook has info for ${persons.length} people</p>
             <p>${new Date()}</P>`);
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
