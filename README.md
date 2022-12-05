# Note Taker

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Test](#tests)
- [Questions](#questions)

---
## Description
This application allows the user to write, store, and delete notes on a web-based server.

---
## Installation
To install for local use:

1. Clone the code and navigate in the terminal to the root directory
2. Execute the following lines of code in the terminal
```
npm install
npm run start
```
3. Navigate to http://localhost:3001 in your browser

To install for web use through Heroku (you must have a Heroku account to do this)

1. Clone the code and navigate in the terminal to the root directory
2. Execute the following lines of code in the terminal
```
$ npm install
$ git add .
$ git commit -m "Added a Procfile" 
$ heroku login
```
Enter your Heroku Login credentials and continue
```
$ heroku create
$ git push heroku main
```
3. Navigate to your Heroku Dashboard to find your new app

---
## Usage
To use the project, navigate to the homepage in your browser (this address will vary depending on whether you installed locally or remotely to Heroku). Once you click the "Get Started" button you will be redirected to the notes page. On this page you can add a new note by clicking the "+" icon in the top right corner and filling out the form in the middle of the page. To save this note, click the floppy disk icon that appears in the top right when both fields have text.

To view an existing note, click on the title of the note you would like to view on the left side of the page and the note will appear in Read Only format.

To delete a message, click on the red delete button next to the note title in the left side navigation bar.

---
## Tests
There are currently no tests for this application

---
## Questions
[https://github.com/pikaypi](https://github.com/pikaypi)

---
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
