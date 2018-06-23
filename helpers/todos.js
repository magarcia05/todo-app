/** 
 * Todos.js contains all the CRUD functions for our todo api
 */


//Import Database Schema and Configurations
var db = require('../models');

exports.getTodos = (req, res) => {
  db.Todo.find()
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      //500 Internal Server Error
      res.status(500).send(err);
    });
};

exports.createTodo = (req, res) => {
  db.Todo.create(req.body)
    .then((newTodo) => {
      //201 Created success
      res.status(201).json(newTodo);
    })
    .catch((err) => {
      //500 Internal Server Error
      res.status(500).send(err);
    });
};

exports.getTodo = (req, res) => {
  db.Todo.findById(req.params.todoId)
    .then((todo) => {
      //200 OK
      res.status(200).json(todo);
    })
    .catch((err) => {
      //500 Internal Server Error
      res.status(500).send(err);
    });
};

exports.updateTodo = (req, res) => {
  db.Todo.findByIdAndUpdate(
      // the id of the item to find
      req.params.todoId,

      // the change to be made. Mongoose will smartly combine your existing 
      // document with this change, which allows for partial updates too
      req.body,

      // an option that asks mongoose to return the updated version 
      // of the document instead of the pre-updated one.
      { new: true }
    )
    .then((todo) => {
      //200 OK
      res.status(200).json(todo);
    })
    .catch((err) => {
      //500 Internal Server Error
      res.status(500).send(err);
    });
};

exports.deleteTodo = (req, res) => {
  db.Todo.findByIdAndRemove(req.params.todoId)
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => {
      //500 Internal Server Error
      res.status(500).send(err);
    });
};

module.exports = exports;