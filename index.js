const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());
app.use(express.static('static'));

let tasks = [];

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/tasks/add', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);

  tasks.push({ taskId: taskId, text: text, priority: priority });

  res.json({ tasks: tasks });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let sortedTasks = tasks.sort((a, b) => a.priority - b.priority);
  res.json({ tasks: sortedTasks });
});

app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);

  tasks = tasks.map((x) => {
    if (x.taskId === taskId) {
      x.priority = priority;
      return x;
    } else {
      return x;
    }
  });
  res.json({ tasks: tasks });
});

app.get('/tasks/edit-text', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;

  tasks = tasks.map((x) => {
    if (x.taskId === taskId) {
      x.text = text;
      return x;
    } else {
      return x;
    }
  });
  res.json({ tasks: tasks });
});

app.get('/tasks/delete', (req, res) => {
  const taskId = parseInt(req.query.taskId);

  tasks = tasks.filter((x) => x.taskId !== taskId);
  res.json({ tasks: tasks });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  const priority = parseInt(req.query.priority);

  let sortedTasks = tasks.filter((x) => x.priority === priority);
  res.json({ tasks: sortedTasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
