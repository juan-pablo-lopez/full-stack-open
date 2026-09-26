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
  name: {
    type: String,
    minLength: 3,
    required: [true, 'A name of 3 or more characters is required!']
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: props => `${props.value} is not a valid number!`
    },
    required: [true, 'Number is required!']
  }
});
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
