const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("You need to provide a password to connect to database");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://RodrigoH95:${password}@fullstackopen22.3rxf4dc.mongodb.net/PhoneBook?retryWrites=true&w=majority`;

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', PersonSchema);

mongoose.connect(url)
    .then(result => {
        console.log("Connected to database");
        if(process.argv.length === 5) {
            const name = process.argv[3];
            const number = process.argv[4];

            const person = new Person({
                name, number,
            });

            console.log(`Added ${name}, number ${number} to phonebook.`);
            console.log("Finished");
            return person.save().then(() => mongoose.connection.close());
        } else {
            console.log("Phonebook:");
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person.name, person.number);
                });
                console.log("Finished");
                mongoose.connection.close();
            });
        }
    })
    .catch(err => console.error(err));