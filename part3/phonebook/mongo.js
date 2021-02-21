const mongoose = require('mongoose');

if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log(
        'Please provide details: node mongo.js <password> <name> <phone>'
    );
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.u6xa6.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    const name = process.argv[3];
    const phone = process.argv[4];
    const person = new Person({
        name,
        phone,
    });
    person.save().then((result) => {
        const { name, phone } = result;
        console.log(`added ${name} ${phone} to phonebook`);
        mongoose.connection.close();
    });
} else {
    console.log('phonebook:');
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.phone}`);
        });
        mongoose.connection.close();
    });
}
