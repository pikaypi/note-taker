// Import and require express and path
const express = require('express');
const path = require('path');

// Initialize the app variable by setting it to the value of express()
const app = express();

// Assign a port for the server to listen
const PORT = process.env.port || 3001;

// Add a static middleware for serving assets in the public folder
app.use(express.static('./public'));

// Import and require the database of tasks
const tasks = require('./db/db.json');

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
