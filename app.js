const express = require('express');
const mongoose = require('mongoose');
const bookController = require('./controllers/bookController');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', bookController.getAllBooks);
app.get('/book', bookController.getAllBooks);
app.get('/book/:id', bookController.getBookById);
app.get('/add', bookController.getAddBookForm);
app.post('/add', bookController.addBook);
app.get('/edit/:id', bookController.getEditBookForm);
app.post('/edit/:id', bookController.updateBook);
app.get('/delete/:id', bookController.deleteBook);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
