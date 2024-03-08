const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'static')))

app.use(express.json());

const messagesFilePath = path.join(__dirname, 'messages.txt');

app.get('/join', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    fs.watchFile(messagesFilePath, { interval: 1000 }, (curr, prev) => {
        if (curr.mtime > prev.mtime) {
            fs.createReadStream(messagesFilePath, { start: prev.size, end: curr.size })
                .on('data', data => {
                    res.write(`data: ${data}\n\n`);
                });
        }
    });

    res.on('close', () => {
        res.end();
    });
});

app.post('/messages', (req, res) => {
    const { message } = req.body;
    fs.appendFile(messagesFilePath, message + '\n', (err) => {
        if (err) {
            return res.status(500).send('Unable to send message');
        }

        res.sendStatus(200);
    })
});

app.listen(4000, () => {
    console.log('Log server is listening on port 4000');
});