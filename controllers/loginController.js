const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const session = require('express-session');

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

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected in loginController...');
});

// Use session middleware
router.use(session({
    secret: 'ZWm/vKsV/Vpuqt1XU6Y+XowcaB/ZnWdOWRNQFvFLS1M=',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

router.post('/', (req, res) => {
    const { loginName, loginPassword } = req.body;

    // Check if username/email and password match in database
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(query, [loginName, loginName], (err, results) => {
        if (err) {
            return res.status(500).send('Server Error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid username/email or password');
        }

        const user = results[0];
        if (user.password !== loginPassword) {
            return res.status(401).send('Invalid username/email or password');
        }

        req.session.userId = user.id;
        res.redirect('C:\Users\HP\Desktop\MOCHUB\views\dashboard\index.html');
    });
});

// Middleware to protect dashbord route
function isAuth(req, res, next) {
    if (req.session.userId) {
        return next;
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
