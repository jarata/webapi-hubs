const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send('Hello world')
});

server.get('/now', (req, res) => {
    const time = new Date().toLocaleTimeString();
    res.send(time)
})

server.listen(4000, () =>
    console.log('Server running on http://localhost:4000')
);