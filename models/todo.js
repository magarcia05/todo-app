/**
 * This is in where we have the declaration of the todo Schema
 * After the Initialization, it compiles and returns the compiled
 * schema as a model
 */
var mongoose = require('mongoose');

//Schema Definition
var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

//Compile Schema to Model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;