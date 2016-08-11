/*eslint-env node */
// MemoApp - routes\index.js

// (a)ä½¿ç¨ã¢ã¸ã¥ã¼ã«ã®èª­ã¿è¾¼ã¿
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var memo = require('../models/memo');
var package = require('../package.json');

// (b)ã«ã¼ã¿ã¼ã®ä½æ
var router = express.Router();

// (1)ã¡ã¢ä¸è¦§ã®è¡¨ç¤º(ãã¼ã¸è¡¨ç¤º)
router.get('/', function(req, res) {
  memo.list(function(err, list) {
    res.render('index', { version : package.version, list : list });
  });
});

// (2)æ°è¦ã¡ã¢ã®ä½æ(ãã¤ã¢ã­ã°è¡¨ç¤º)
router.get('/memos', function(req, res) {
  res.render('dialog', { id : null, doc : null });
});

// (3)æ¢å­ã¡ã¢ã®ç·¨é(ãã¤ã¢ã­ã°è¡¨ç¤º)
router.get('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.get(id, function(err, doc) {
    res.render('dialog', { id : id, doc : doc });
  });
});

// (4)æ°è¦ã¡ã¢ã®ä¿å­
router.post('/memos', function(req, res) {
  var id = uuid.v4();
  var doc = {
    title : req.body.title,
    content : req.body.content,
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/');
  });
});

// (5)æ¢å­ã¡ã¢ã®ä¿å­
router.put('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');
  var doc = {
    title : req.body.title,
    content : req.body.content,
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/');
  });
});

// (6)æ¢å­ã¡ã¢ã®åé¤
router.delete('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.remove(id, function(err) {
    res.redirect('/');
  });
});

module.exports = router;