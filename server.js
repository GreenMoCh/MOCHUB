const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0449',
    database: 'userHandler',
    port: 3306,
    ssl: {
        rejectUnauthorized: false
    }
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw (err);
    }
    console.log('Connected in server.js...');
});

// Use session middleware
app.use(session({
    secret: 'ZWm/vKsV/Vpuqt1XU6Y+XowcaB/ZnWdOWRNQFvFLS1M=',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' and 'DASHBOARD' folders
app.use(express.static(path.join('C:/Users/HP/Desktop/MOCHUB/', 'public')));

// Route to render HTML template
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'index.html'));
});

// Route to render login page
app.get('/login', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'login.html'));
});

// Route to render register page
app.get('/register', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'register.html'));
});

// Mount the login and registration routes
app.use('/login', loginController);
app.use('/register', registerController);

// Route to render dashbord page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'dashboard.html'));
});

app.get('/boards', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'boards.html'));
});
app.get('/calendar', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'calendar.html'));
});
app.get('/tasks', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'tasks.html'));
});
app.get('/meetings', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'meetings.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
