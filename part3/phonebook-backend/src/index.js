const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person')

const app = express();

// For logging purposes
const methodsWithBody = ['POST']; // 'PUT', 'PATCH' can be added if needed

app.use(morgan((tokens, req, res) => {
  const logItems = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    '-',
    tokens['response-time'](req, res), 'ms'
  ];

  if (methodsWithBody.includes(req.method) && req.body && Object.keys(req.body).length > 0) {
    logItems.push('-', JSON.stringify(req.body));
  }

  return logItems.join(' ');
}));

// For POST requests
app.use(express.json());

// For frontend requests
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('');
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  let missingName = false;
  let missingNumber = false;

  if (!body.name) {
    missingName = true;
  }

  if (!body.number) {
    missingNumber = true;
  }

  if (missingName || missingNumber) {
    return response.status(400).json({ 
      error: `Required information is missing: ${missingName ? "name" : ""} ${missingNumber ? "number" : ""}.`
    });
  };

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});

// I had to research a lot to find below solution
// This async/await thing seems to be covered later in Part 4...
app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id);

    if (person) {
      console.log(person);
      return response.json(person);
    } else {
      return response.status(404).json({
        error: `Person with id ${request.params.id} was not found.`
      });
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findByIdAndDelete(request.params.id);

    if (person) {
      return response.status(204).json(person);
    } else {
      return response.status(404).json({
        error: `Person with id ${request.params.id} was not found.`
      });
    }
  } catch (error) {
    next(error);
  }
});

app.put('/api/persons/:id', async (request, response, next) => {
  const { name, number } = request.body;

  try {
    const person = await Person.findById(request.params.id);

    if (person) {
      // I thought these lines would fail because person is const
      person.name = name;
      person.number = number;
      
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    } else {
      return response.status(404).json({
        error: `Person with id ${request.params.id} was not found.`
      });
    }
  } catch (error) {
    next(error);
  }
});

app.get('/info', (request, response) => {
  const now = new Date();
  
  Person.countDocuments({})
    .then(totalEntries => {
      const info = `<p>Phonebook has information for ${totalEntries} people.</p><p>${now.toString()}</p>`;
      response.send(info);
    })
    .catch(error => {
      response.status(500).send({ error: error.message });
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Bad Request: unknown Id format.' });
  }

  next(error);
};

// To use above function
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
