require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const process = require('process');
const app = express();

app.use(express.static('build'));
app.use(cors());
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

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons);
    });
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).json({ error: 'no person found' });
            }
        })
        .catch((error) => {
            next(error);
        });
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            next(error);
        });
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        phone: body.phone,
    };

    const opts = { new: true, runValidators: true };
    Person.findByIdAndUpdate(req.params.id, person, opts)
        .then((updatedPerson) => {
            res.json(updatedPerson);
        })
        .catch((error) => {
            next(error);
        });
});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    const person = new Person({
        name: body.name,
        phone: body.phone,
    });
    person
        .save()
        .then((savedPerson) => {
            res.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.get('/info', (req, res) => {
    Person.find({}).then((persons) => {
        res.send(`<p>phonebook has info for ${persons.length} people</p>
                 <p>${new Date()}</p>`);
    });
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (
        error.name === 'ValidationError' ||
        error.name === 'MongoError'
    ) {
        return res.status(400).send({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
