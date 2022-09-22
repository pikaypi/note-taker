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
app.use(express.urlencoded({ extended: false}))

// Import and require the database of tasks
const notes = require('./db/db.json');

// Create a route that will serve up the notes.html page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Create a GET route for /api/notes that returns the database as JSON
app.get('/api/notes', (req, res) => 
    res.json(notes)
);

// Create a POST route for /api/notes that will add new notes to the database
app.post('/api/notes', (req, res) => {
    // Temporary log that a request was received
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

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

        res.json(newNote);
    } else {
        res.status(500).json('Error in posting note').send();
    }
});

app.delete('/api/notes/:id', (req, res) => {
    // Temporarily log that the request was received
    console.info(`${req.method} request has been received`);

    // Extract the note id from the api request url
    const pathArray = req.originalUrl.split('/');
    const id = pathArray[pathArray.length - 1];

    // Read existing notes from the database
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // Convert the file into a JSON object
            const parsedNotes = JSON.parse(data);

            // Create a variable to hold the new notes list
            const newNotes = [];

            // Iterate through the notes and add all but the note to be deleted
            for (let i = 0; i < parsedNotes.length; i++) {
                if (parsedNotes[i]['id'] !== id) {
                    newNotes.push(parsedNotes[i])
                }
            }

            // Write the update notes back to the file
            fs.writeFile('./db/db.json', JSON.stringify(newNotes), (writeErr) => 
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
            );
        }
    });
    res.status(201).send();
});

// Create a route the will serve up the index.html page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Tell the server to listen at the assigned port
app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);
