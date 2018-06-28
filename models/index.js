/**
 * When we required the models directory, by default looks for the index.js
 * file inside the models directoy. In this js file is in where we are 
 * going to connect to our mongoose db. 
 */

var mongoose = require('mongoose');
var url = process.env.DATABASEURL || 'mongodb://localhost/todo-api';

//mongoose.set('debug', true);
mongoose.connect(url);
mongoose.Promise = Promise; //Allow us to use the promise syntax

// Get the compiled todo model
module.exports.Todo = require("./todo");