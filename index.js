const express = require('express');
const database = require('./data/db.js');

const server = express();

// middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello world')
});

server.get('/now', (req, res) => {
    const time = new Date().toLocaleTimeString();
    res.send(time)
});
// C.R.U.D.

// R. read
server.get('/hubs', (req, res) => {
    const hub = database.hubs
    .find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch((code, message) => {
            res.status(200).json({
                success: false,
                message,
            })
        })
});

// C. create
server.post('/hubs', (req, res) => {
   const hubInfo = req.body;
    database.hubs
        .add(hubInfo)
        .then(hub => {
            res.status(201).json({ success: true, hub });
        })
        .catch(({ code, message }) => {
            res.status(200).json({
                success: false,
                message,
            })
        })
});

// U. update

server.put('/hubs/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    database.hubs
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({ success: true, updated })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Cannot fond that id"
                })
            }
        })
        .catch(({ code, message }) => {
            res.status(code).json({
                success: false,
                message,
            })
        })
});

// D. delete
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;
    database.hubs
        .remove(id)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(({ code, message }) => {
            res.status(200).json({
                success: false,
                message,
            })
        })
});

server.get('/hubs/:id', (req, res) => {
    // const {id} = req.params;
    database.hubs
        .findById(req.params.id)
        .then(hubs => {
            if (hubs) {
                res.status(200).json({ success: true, hubs })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Cannot find that id"
                })
            }
        })
        .catch(({ code, message }) => {
            res.status(200).json({
                success: false,
                message,
            })
        })
});

server.listen(4000, () =>
    console.log('Server running on http://localhost:4000')
);