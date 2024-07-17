const express = require('express');
const path = require('path');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const tasksRouter = require('./routes/tasks');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public'
app.use(express.static(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'public')));

// Route to render HTML template
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'views', 'index.html'));
});

// Route to render login page
app.get('/login', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'views', 'login.html'));
});

// Route to render register page
app.get('/register', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'views', 'register.html'));
});

app.use('/login', loginController);
app.use('/register', registerController);

// Route to render dashbord page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'views', 'dashboard.html'));
});

// Route to render tasks page
app.get('/tasks', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'views', 'tasks.html'));
});

app.use('/api', tasksRouter);

// Route to render boards page
app.get('/boards', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'views', 'boards.html'));
});

// Route to render meetings page
app.get('/meetings', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Documents/GitHub/MOCHUB', 'views', 'meetings.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
