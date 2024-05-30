const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const session = require('express-session');

//Database connection
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

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to loginController...');
});

// Middleware to initialize sessions
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Login route
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.json({ message: 'User not found' });
        }

        const user = results[0];
        if (user.password !== password) {
            return res.json({ message: 'Invalid password' });
        }

        // Store user ID in session
        req.session.userId = user.id;

        // Redirect to dashboard
        res.redirect('/dashboard');
    });
});

module.exports = router;