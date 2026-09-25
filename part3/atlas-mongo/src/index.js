const mongoose = require('mongoose');

const numOfArgs = process.argv.length;
let personName = null;
let phoneNumber = null;

if (numOfArgs < 3) {
  console.log('Usage:');
  console.log('\tnode mongo.js <mongo-password> ["Person Name"] [phone-number]');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstackopen:${password}@fso.uf3kaba.mongodb.net/phonebook?appName=FSO`;

mongoose.set('strictQuery',false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model('Person', personSchema);

if (numOfArgs < 5) {
  Person.find({}).then(result => {
    console.log('Phonebook: ');
    result.forEach(person => {
      console.log(person.name, person.number);
    })
    mongoose.connection.close();
  })
} else {
  personName = process.argv[3];
  phoneNumber = process.argv[4];

  const person = new Person({
    name: personName,
    number: phoneNumber
  });

  person.save().then(result => {
    console.log(`New person entry saved: ${personName} ${phoneNumber}`);
    mongoose.connection.close();
  })
}
