/** 
 * Todos.js stores all the existing routes from our todos api
 * They will be called by the user as follows: /api/todos/[userInput]
 */
 
var express = require('express'),
    router = express.Router(),
    db = require("../models");  //Get the database from models

router.get('/', function(req, res){
  db.Todo.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((err) => {
        res.send(err);
    })
});


module.exports = router;