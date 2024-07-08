const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2');

const router = express.Router();

// MySQL conection setup
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
    console.log('loginController connected to the database');
});

// Login router
router.post('/', [
    body('email').isEmail().withMessage('Invalid email Adress'),
    body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const sql = 'SELECT * FROM Users WHERE Email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const user = results[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            
            // Handle successful login
            res.redirect('/dashbord');
        });
    });
});

module.exports = router;
