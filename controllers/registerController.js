const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

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
    console.log('Connected in registerController...');
});

// POST request handler for registration
router.post('/', (req, res) => {
    const { registerName, registerUsername, registerEmail, registerPassword, registerRepeatPassword } = req.body;

    // Validate password match
    if (registerPassword !== registerRepeatPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // Check if username or email already exists in database
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [registerUsername, registerEmail], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            return res.status(400).send('Username or email already exists');
        }

        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [registerUsername, registerEmail, registerPassword], (err, results) => {
            if (err) {
                return res.status(500).send('Server Error');
            }

            res.send('Registration successful');
        });
    });
});

module.exports = router;
