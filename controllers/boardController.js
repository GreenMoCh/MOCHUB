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

exports.getUserBoards = async (req, res) => {
    const UserId = req.user.id;

    try {
        const boards = await db.query('SELECT * FROM boards WHERE user_id = ?', [userId]);
        res.json(boards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch boards' });
    }
};
