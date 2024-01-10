const http = require('http');

const server = http.createServer((req, res) => {
    const cookiesStr = req.headers.cookie;
    const cookiesSplit = cookiesStr.split(';').map(c => c.trim());

    const cookiesObj = {};

    for (const cookie of cookiesSplit) {
        const [key, value] = cookie.split('=');
        cookiesObj[key] = JSON.parse(value);
    }

    if (cookiesObj['hasvisitedbefore']) {
        res.end('Welcome back!');
    } else {
        const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
        res.setHeader('Set-Cookie', `hasvisitedbefore=1; Expires=${expires}; HttpOnly`);
        res.end('Hello, I see this is your first time on this server!');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});