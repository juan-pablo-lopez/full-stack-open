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
app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Person.findById(request.params.id);

    if (person) {
      console.log(person)
      return response.json(person);      
    } else {
      return response.status(404).json({
        error: `Person with id ${id} was not found.`
      });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
