const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
