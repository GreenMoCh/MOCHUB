const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2');

const router = express.Router();
const saltRounds = 10;

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
    console.log('registerController connected to the database');
});

// Register route
router.post('/', [
    body('registerName').notEmpty().withMessage('Full name is required'),
    body('registerUsername').notEmpty().withMessage('Username is required'),
    body('registerEmail').isEmail().withMessage('Invalid email adreess'),
    body('registerPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('registerRepeatPassword').custom((value, { req }) => {
        if (value !== req.body.registerPassword) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { registerName, registerUsername, registerEmail, registerPassword } = req.body;

    bcrypt.hash(registerPassword, saltRounds, (err, hash) => {
        if (err) throw err;

        const sql = 'INSERT INTO Users (FullName, Username, Email, Password) VALUES (?, ?, ?, ?)';
        db.query(sql, [registerName, registerUsername, registerEmail, registerPassword, hash], (err, result) => {
            if (err) throw err;
            res.redirect('/login');
        });
    });
});

module.exports = router;
