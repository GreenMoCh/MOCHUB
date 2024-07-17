const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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

db.connect((err) => {
    if (err) throw err;
    console.log('tasksRouter connected to the database');
});

router.use(bodyParser.json());

router.post('/tasks', (req, res) => {
    const { task, date, priority } = req.body;

    const query = 'INSERT INTO tasks (task, date, priority) VALUES (?, ?, ?)';
    db.query(query, [task, date, priority], (err, results) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.status(201).send('Task added');
    });
});

router.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.status(200).json(results);
    });
});

router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task, date, priority } = req.body;

    const query = 'UPDATE tasks SET task = ?, date = ?, priority = ? WHERE id = ?';
    connection.query(query, [task, date, priority, id], (err, results) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Task updated');
    });
});

router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Task deleted');
    });
});

module.exports = router;
