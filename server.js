// Import and require express and path
const express = require('express');
const path = require('path');

// Invoke express in the variable app
const app = express();

// Assign a port for the server to listen
const PORT = process.env.port || 3001;

// Add a static middleware for serving assets in the public folder
app.use(express.static('./public'));

// Tell the server to listen at the assigned port
app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);
