/** 
 * Todos.js stores all the existing routes from our todos api
 * They will be called by the user as follows: /api/todos/[userInput]
 */

var express = require('express'),
    router = express.Router(),
    db = require("../models"); //Get the database from models

router.get('/', (req, res) => {
    db.Todo.find()
        .then((todos) => {
            res.status(200).json(todos);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.post('/', (req, res) => {
    db.Todo.create(req.body)
        .then((newTodo) => {
            //status(201) was added for clarity since it means something was created
            res.status(201).json(newTodo);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.get('/:todoId', (req, res) => {
    db.Todo.findById(req.params.todoId)
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.put('/:todoId', (req, res) => {
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
            res.status(200).json(todo);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.delete('/:todoId', (req, res) => {
    db.Todo.findByIdAndRemove(req.params.todoId)
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = router;