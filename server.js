const UUID = require('./utils/uuid');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Set up the server variables
const app = express();
const PORT = process.env.PORT || 3001;

// Set up the middleware
app.use(express.json());
app.use(express.static('./public'));

// Create an object to hold the database while the application is open
let notes = require('./db/db.json')

// A GET route to render the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// A GET route to render the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// An API GET route that collects and returns the notes from the databse
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        err
            ? res.json(err)
            : res.json(JSON.parse(data))
    });

});

// An API POST route that creates a new note object and adds it to the database
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: UUID()
        }
        notes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => 
            err
                ? console.error(err)
                : console.info('Succuessfully updated notes!')
        );
        res.json(newNote);
    } else {
        res.status(500).json('Error in posting note')
    }
});

// AN API DELETE route that finds a note by id and removes it from the database
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

// Start the server
app.listen(PORT, () => 
    console.info(`Server listening at http://localhost:${PORT}`)
);