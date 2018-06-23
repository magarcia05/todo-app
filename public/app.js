/* global $ */
$(document).ready(function() {
  $.getJSON("/api/todos")
    .then(addTodos);

  $('#todoInput').keypress(function(event) {
    if (event.which == 13) {
      createTodo();
    }
  });

  //Workaround to select the spans inside the list-group class
  $('.list-group').on('click', 'li', function(event){
    updateTodo($(this));
  });

  //Workaround to select the spans inside the list-group class
  $('.list-group').on('click', 'span', function(event){
    //Event continue to trigger up, so it goes to .list-grou- -> li
    event.stopPropagation();
    removeTodo($(this).parent());
  });
});

/*****************************CRUD functions for Todolist *****************************/

function addTodo(todo) {
  var newTodo = $('<li>'+todo.name +' <span>X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  newTodo.addClass('list-group-item');

  $('.list-group').append(newTodo);
}

function addTodos(todos) {
  //add Todos to the page
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function createTodo() {
  //send request to create new todo
  var usrInput = $('#todoInput').val();
  $.post('/api/todos', { name: usrInput })
    .then(function(newTodo) {
      //Remove the Todotask from the form
      $('#todoInput').val('');
      //Display the Todo we just added
      addTodo(newTodo);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function updateTodo(todo){
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    console.log(updateData);
    todo.toggleClass("done");
    todo.data('completed', isDone);
  });
}

function removeTodo(todo){
  var deleteUrl = '/api/todos/' + todo.data('id'); 
  
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    //$(this).parent().remove() to remove it from the screen
    todo.remove();
  })
  .catch(function(err){
    console.log(err);
  });
}
