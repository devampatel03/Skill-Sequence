const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();
app.use(express.json()); 


app.use(cors());

const db = mysql.createConnection({
    'user': 'avnadmin',
    'password': 'AVNS_h4eCBRzKkM_Bl1FWHqq',
    'host': 'skill-skillsequence.h.aivencloud.com',
    'database': 'skillsequence',
    'port': '28152',
});
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/api/video-list', (req, res) => {
    const query = 'SELECT id, title FROM videos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/api/status', (req, res) => {
    const userId = 1;
    db.query('SELECT video_id,completed FROM vid_progress WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
        console.log(results);
        
    });
});

app.get('/api/video-details', (req, res) => {
    
    db.query('SELECT * FROM video_details', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
        console.log(results);
        
    });
});

app.get('/api/videos/:id', (req, res) => {
    const videoId = req.params.id;
    db.query('SELECT video FROM videos WHERE id = ?', [videoId], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const videoData = results[0].video;
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': videoData.length
            });
            
            res.end(videoData);
        } else {
            res.status(404).send('Video not found');
        }
    });
});


app.get('/api/progress/:id', (req, res) => {
    const videoId = req.params.id;
    const userId = 1;

    db.query('SELECT progress FROM vid_progress WHERE user_id = ? AND video_id = ?', [userId, videoId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.json({ progress: results[0].progress });
        } else {
            res.json({ progress: 0 });
        }
    });
});



app.post('/api/save-progress', (req, res) => {
    const { videoId, progress } = req.body;
    const userId = 1; 
    db.query(
        'INSERT INTO vid_progress (user_id, video_id, progress) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE progress = ?',
        [userId, videoId, progress, progress],
        (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.sendStatus(200);
        }
    );
});


app.post('/api/save-status', (req, res) => {
    const { videoId,completed } = req.body;
    const progress = 0; 
    const userId = 1; 

    db.query(
        'UPDATE vid_progress SET progress = ?, completed = ? WHERE user_id = ? AND video_id = ? ',
        [progress, completed, userId,videoId],
        (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.sendStatus(200);
        }
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));