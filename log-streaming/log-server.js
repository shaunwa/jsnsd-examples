const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'static')))

app.use(express.json());

const logFilePath = path.join(__dirname, 'application.log');

app.post('/logs', (req, res) => {
    const { message } = req.body;

    fs.appendFile(logFilePath, message + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error writing to log');
        }

        res.send('Success!');
    });
});

app.get('/logs', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    fs.watchFile(logFilePath, { interval: 1000 }, (curr, prev) => {
        if (curr.mtime > prev.mtime) {
            fs.createReadStream(logFilePath, { start: prev.size, end: curr.size })
                .on('data', data => {
                    res.write(`data: ${data}\n\n`);
                });
        }
    });

    res.on('close', () => {
        res.end();
    });
});

app.listen(4000, () => {
    console.log('Log server is listening on port 4000');
});