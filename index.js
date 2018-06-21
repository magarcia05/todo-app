/** 
 * This is the starting node.js script for our todo-app
 */

// set up ======================================================================

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

var todoRoutes = require('./routes/todos'); // Get the todo routes from location

//We need this in order to handle the post request data from the user
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//This is in order to serve our content from views
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



// routes ======================================================================

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.get('*', (req, res) => {
    res.redirect('/');
});

// listen ======================================================================

app.listen(port, () => {
    console.log(`App is running on Port ${port}`);
});