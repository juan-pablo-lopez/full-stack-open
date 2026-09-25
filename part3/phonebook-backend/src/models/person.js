const mongoose = require('mongoose');
const mongodbUrl = process.env.MONGODB_URI;
const mongodbUrlWithPwd = mongodbUrl.replace("${password}", process.env.MONGODB_PWD);

mongoose.set('strictQuery', false);
console.log('Connecting to', mongodbUrl.replace('${password}',''));
mongoose.connect(mongodbUrlWithPwd, { family: 4 })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
