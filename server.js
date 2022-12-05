const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid')

// Set the app variable to express()
const app = express();
const PORT = process.env.PORT || 3001;

// Assign a port for the server
const PORT = process.env.port || 3001;

// Add middleware for parsing application/json
app.use(express.json());
app.use(express.static('./public'));
let notes = require('./db/db.json')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Route the get request for /api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        err
            ? res.json(err)
            : res.json(JSON.parse(data))
    });

});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: randomUUID().split('-')[0]
        }
        notes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => 
            err
                ? console.error(err)
                : console.info('Succuessfully updated notes!')
        );
    
        res.json(newNote);
            };
        })
    } else {
        res.status(500).json('Error in posting note')
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter((note) => note.id != id);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => 
        err
            ? console.error(err)
            : console.info('Successfully deleted note')
    );
    res.json(notes);
});

// Set the server to listen
app.listen(PORT, () => 
    console.info(`Server listening at http://localhost:${PORT}`)
);