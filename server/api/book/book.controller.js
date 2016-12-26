'use strict';

var _ = require('lodash');
var Book = require('./book.model');

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.user.borrowedBook, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    return res.json(book);
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  
  if(req.user.role != "librarian"){
      console.log("insufficient priviledge");
      return res.status(69);
  } 

  //check if book exists
  var bookexists = Book.findOne({ 'title': req.body.title, 'publisher': req.body.publisher, 'author': req.body.author});
  var query = Book.findOne({ 'title': req.body.title });

  // selecting the `name` and `occupation` fields
  query.select('title');

  // execute the query at a later time
  query.exec(function (err, book) {
    if (err) return handleError(err);
    if(book != null){
      console.log(book.title);
      console.log("already exists");
      return res.status(69);    
    }
    else{
      //for new book
      var newbook = req.body;
      Book.create(newbook, function(err, book) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(book);
      });
    }
  });  
  return res.status(15);
};

exports.borrow = function(req,res){
  if(req.user.role != "customer"){
      console.log("insufficient priviledge");
      return res.status(69);
  }  

  if(!req.user.borrowedBook){
    req.user.borrowedBook = req.params.id;
    req.user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200);
    });
    Book.findById(req.params.id, function (err,book){
      if(err) {return handleError(res,err);}
      if(book.count>0)  
      {
        book.count -= 1;
        book.save(function(err){
          if(err) {return handleError(res,err);}
          return res.status(200).json(book);
        });
      }
    });
  }
}

exports.returnbook = function(req,res){
  if(req.user.role != "customer"){
      console.log("insufficient priviledge");
      return res.status(69);
  }  

  if(req.user.borrowedBook){
    req.user.borrowedBook = null;
    req.user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200);
    });
    Book.findById(req.params.id, function (err,book){
      if(err) {return handleError(res,err);}
      book.count += 1;
      book.save(function(err){
        if(err) {return handleError(res,err);}
        return res.status(200).json(book);
      });
    });
  }
}

// Updates an existing book in the DB.
exports.update = function(req, res) {

  if(req.user.role != "librarian"){
      console.log("insufficient priviledge");
      return res.status(69);
  } 

  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    var updated = _.merge(book, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(book);
    });
  });
};

// Deletes a book from the DB.
exports.remonecop = function(req, res) {
  
  if(req.user.role != "librarian"){
      console.log("insufficient priviledge");
      return res.status(69);
  } 

  console.log("remonecop");
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    if(book.count>1){
      book.count -= 1;
      book.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(book);
      });
    }
    else
      book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  
  if(req.user.role != "librarian"){
      console.log("insufficient priviledge");
      return res.status(69);
  } 

  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}