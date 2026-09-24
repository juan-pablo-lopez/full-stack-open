const express = require('express');
const morgan = require('morgan');

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

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/', (request, response) => {
  response.send('');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

const generateId = () => {
  return Math.floor(Math.random() * ((Date.now()) + 1)).toString();
}

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

  const existingPerson = persons.find(person => person.name === body.name);

  if (existingPerson) {
    return response.status(409).json({ 
      error: 'Name must be unique.'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    return response.status(404).json({
      error: `Person with id ${id} was not found.`
    });
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.get('/info', (request, response) => {
  const now = new Date();
  const info = `<p>Phonebook has information for ${persons.length} people.</p><p>${now.toString()}</p>`;
  response.send(info);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
