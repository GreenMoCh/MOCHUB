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
    console.log('MySQL connected in server.js...');
});

// Use session middleware
app.use(session({
    secret: 'ZWm/vKsV/Vpuqt1XU6Y+XowcaB/ZnWdOWRNQFvFLS1M=',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Serve static files from the 'public' and 'DASHBOARD' folders
app.use(express.static(path.join('C:/Users/HP/Desktop/MOCHUB/', 'public')));
app.use(bodyParser.urlencoded({ extended: true}));

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
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/', 'views', 'login.html'));
});

// Mount the login and registration routes
app.use('/login', loginController);
app.use('/register', registerController);

// Route to render dashbord page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join('C:/Users/HP/Desktop/MOCHUB/views', 'dashboard', 'index.html'));
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
