/* global $ */
$(document).ready(function() {
  /***** Tooltips initialization *****/

  $('[data-toggle="tooltip"]').tooltip()

  /*****CRUD Event listeners for Todolist *****/
  
  $('#save-task').on('click',function(event){
    createTodo($('#modal-task').val());
  });

  // Create a Todo
  $('#todoInput').keypress(function(event) {
    if (event.which == 13) {
      createTodo($('#todoInput').val());
    }
  });

  // Read all Todos
  $.getJSON("/api/todos")
    .then(addTodos);

  // Update a Todo completion
  $('.list-group').on('click', 'li', function(event) {
    //Workaround on top to select the li inside the list-group class
    updateTodo($(this));
  });

  // Delete a Todo
  $('.list-group').on('click', 'span', function(event) {
    //Event continue to trigger up, so it goes to .list-grou- -> li
    event.stopPropagation();
    removeTodo($(this).parent());
  });

});

/***************************** CRUD functions for Todolist *****************************/

function addTodo(todo) {
  var newTodo = $('<li><span class="oi oi-trash"></span> ' + todo.name + '</li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  newTodo.addClass('list-group-item');

  if (todo.completed) {
    newTodo.addClass("done");
  }
  $('.list-group').append(newTodo);
}

function addTodos(todos) {
  //add Todos to the page
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function createTodo(usrInput) {
  //send request to create new todo
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

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = { completed: isDone }
  $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: updateData
    })
    .then(function(updatedTodo) {
      todo.toggleClass("done");
      todo.data('completed', isDone);
    });
}

function removeTodo(todo) {
  var deleteUrl = '/api/todos/' + todo.data('id');

  $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data) {
      //$(this).parent().remove() to remove it from the screen
      todo.remove();
    })
    .catch(function(err) {
      console.log(err);
    });
}
