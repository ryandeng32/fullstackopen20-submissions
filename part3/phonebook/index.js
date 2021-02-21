require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

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
app.use(express.static('build'));

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
        .then((result) => {
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
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then((updatedPerson) => {
            res.json(updatedPerson);
        })
        .catch((error) => {
            next(error);
        });
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.phone) {
        return res.status(400).json({ error: 'no name or number provided' });
    }
    Person.find({ name: body.name }).then((result) => {
        if (result.length !== 0) {
            res.status(400).send({ error: 'name must be unique' });
        } else {
            const person = new Person({
                name: body.name,
                phone: body.phone,
            });
            person.save().then((savedPerson) => {
                res.json(savedPerson);
            });
        }
    });
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
    }

    next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
