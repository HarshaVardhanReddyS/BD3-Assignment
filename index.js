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

function addTask(taskId, text, priority)
{
  return { taskId: taskId, text: text, priority: priority }
}

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/add', (req, res) => {
  // tasks = []
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);

  tasks.push(addTask(1, "Fix bug #101", 2))
  tasks.push(addTask(2, "Implement feature #202", 1))
  tasks.push(addTask(3, "Write documentation", 3))

  let resultTasks = [...tasks]
  resultTasks.push(addTask(4, "Review%20code", 1))

  res.json({ tasks: resultTasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let sortedTasks = tasks.sort((a, b) => a.priority - b.priority);
  res.json({ tasks: sortedTasks });
});

app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);

  let priorityTasks = tasks.map((x) => {
    if (x.taskId === taskId) {
      x.priority = priority;
      return x;
    } else {
      return x;
    }
  });
  priorityTasks = priorityTasks.sort((a, b) => a.taskId - b.taskId);
  res.json({ tasks: priorityTasks });
});

app.get('/tasks/edit-text', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;

  let editedTasks = tasks.map((x) => {
    if (x.taskId === taskId) {
      x.text = text;
      return x;
    } else {
      return x;
    }
  });
  editedTasks = editedTasks.slice().sort((a, b) => a.textId - b.textId);
  res.json({ tasks: editedTasks });
});

app.get('/tasks/delete', (req, res) => {
  const taskId = parseInt(req.query.taskId);

  resultTasks = tasks.filter((x) => x.taskId !== taskId);
  res.json({ tasks: resultTasks });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  const priority = parseInt(req.query.priority);

  let sortedTasks = tasks.filter((x) => x.priority === priority);
  res.json({ tasks: sortedTasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
