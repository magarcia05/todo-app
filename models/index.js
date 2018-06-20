/**
 * When we required the models directory, by default looks for the index.js
 * file inside the models directoy. In this js file is in where we are 
 * going to connect to our mongoose db. 
 */

var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api');
mongoose.Promise = Promise; //Allow us to use the promise syntax

// Get the compiled todo model
module.exports.Todo = require("./todo");