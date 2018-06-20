// set up ======================================================================

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

var todoRoutes = require('./routes/todos'); // Get the todo routes from location


// routes ======================================================================

app.get('/', (req, res) => {
  res.send('Hello from the root router');
});

app.use('/api/todos', todoRoutes);


// listen ======================================================================

app.listen(port, () => {
    console.log(`App is running on Port ${port}`);
});