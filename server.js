// Import and require modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid')

// Initialize the app variable by setting it to the value of express()
const app = express();

// Assign a port for the server to listen
const PORT = process.env.port || 3001;

// Add a static middleware for serving assets in the public folder
app.use(express.static('./public'));

// Add middleware for parsing application/json
app.use(express.json());

// Import and require the database of tasks
const notes = require('./db/db.json');

// Create a GET route for /api/notes that returns the database as JSON
app.get('/api/notes', (req, res) => 
    res.json(notes)
);

// Create a POST route for /api/notes that will add new notes to the database
app.post('/api/notes', (req, res) => {
    // Temporary log that a request was received
    const {title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuid()
    }
    
    console.log(newNote);
    // Read existing notes from the database
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // Convert the file into a JSON object
            const parsedNotes = JSON.parse(data);

            // Add the new note
            parsedNotes.push(newNote);

            // Write the update notes back to the file
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (writeErr) => 
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
            );
        }
    });
});

// Create a route that will serve up the notes.html page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Create a route the will serve up the index.html page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Tell the server to listen at the assigned port
app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);
