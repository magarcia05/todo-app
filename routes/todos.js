/** 
 * Todos.js uses the helpers/todos CRUD helper functions to create
 * routes for our API
 */

var express = require('express'),
    router = express.Router(),
    helpers = require("../helpers/todos");


router.route('/')
 .get(helpers.getTodos)
 .post(helpers.createTodo);
 
router.route('/:todoId')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);
  
module.exports = router;