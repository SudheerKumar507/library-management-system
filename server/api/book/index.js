'use strict';

var express = require('express');
var controller = require('./book.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.put('/borrowed/',auth.hasRole('customer'), controller.show);
router.put('/return/:id',auth.hasRole('customer'), controller.returnbook);
router.post('/',auth.hasRole('librarian'), controller.create);
router.put('/:id',auth.hasRole('librarian'), controller.update);
router.put('/borrow/:id',auth.hasRole('customer'), controller.borrow);
router.delete('/one/:id',auth.hasRole('librarian'), controller.remonecop);
router.delete('/:id',auth.hasRole('librarian'), controller.destroy);

module.exports = router;