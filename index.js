const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = [];
let currentId = 1;

// Create a new TODO
app.post('/todos', (req, res) => {
  const todo = { id: currentId++, ...req.body };
  todos.push(todo);
  res.status(201).json(todo);
});

// Get all TODOs
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a TODO by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('TODO not found');
  }
});

// Update a TODO by ID
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    Object.assign(todo, req.body);
    res.json(todo);
  } else {
    res.status(404).send('TODO not found');
  }
});

// Delete a TODO by ID
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('TODO not found');
  }
});

app.listen(port, () => {
  console.log(`TODO app listening at http://localhost:${port}`);
});
