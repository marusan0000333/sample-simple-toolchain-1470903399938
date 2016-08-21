// MemoApp - routes\index.js

// (a)使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var memo = require('../models/memo');
var package = require('../package.json');

// (b)ルーターの作成
var router = express.Router();

// (1)ログインページの表示(ページ表示)
router.get('/', function(req, res) {
  memo.list(function(err, list) {
    res.render('index', { version : package.version, list : list });
  });
});

// (1)メニューページの表示(ページ表示)
router.get('/menu', function(req, res) {
  memo.list(function(err, list) {
    res.render('menu', { version : package.version, list : list });
  });
});

// (1)ルート選択ページの表示(ページ表示)
router.get('/3/huntroute', function(req, res) {
  memo.list(function(err, list) {
    res.render('3/huntroute', { version : package.version, list : list });
  });
});



// (1)メモ一覧2番目の表示(ページ表示)
router.get('/3/huntindex', function(req, res) {
  memo.list(function(err, list) {
    res.render('3/huntindex', { version : package.version, list : list });
  });
});


// (2)新規メモの作成(ダイアログ表示)
router.get('/memos', function(req, res) {
  res.render('3/dialog', { id : null, doc : null });
});

// (3)既存メモの編集(ダイアログ表示)
router.get('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.get(id, function(err, doc) {
    res.render('3/dialog', { id : id, doc : doc });
  });
});

// (4)新規メモの保存
router.post('/memos', function(req, res) {
  var id = uuid.v4();
  var doc = {
    title : req.body.title,
    latitude : req.body.latitude,
    longitude : req.body.longitude,
    content : req.body.content,
    question_class : req.body.question_class,
    question : req.body.question,
    answer : req.body.answer,
    bad_answer1 : req.body.bad_answer1,
    bad_answer2 : req.body.bad_answer2,
    bad_answer3 : req.body.bad_answer3,
    information : req.body.information,
    ref_url : req.body.ref_url,
    public_permission : 'local',
    attachment_name : req.body.attachment_name,
    attachment_content_type : req.body.attachment_content_type,
    attachment_lastModifiedDate : req.body.attachment_lastModifiedDate,
    attachment_size : req.body.attachment_size,
    attachment_base64 : req.body.attachment_base64,
    createAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss'),
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/3/huntindex');
  });
});

// (5)既存メモの保存
router.put('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');
  var doc = {
    title : req.body.title,
    latitude : req.body.latitude,
    longitude : req.body.longitude,
    content : req.body.content,
    question_class : req.body.question_class,
    question : req.body.question,
    answer : req.body.answer,
    bad_answer1 : req.body.bad_answer1,
    bad_answer2 : req.body.bad_answer2,
    bad_answer3 : req.body.bad_answer3,
    information : req.body.information,
    ref_url : req.body.ref_url,
    public_permission : 'local',
    attachment_name : req.body.attachment_name,
    attachment_content_type : req.body.attachment_content_type,
    attachment_lastModifiedDate : req.body.attachment_lastModifiedDate,
    attachment_size : req.body.attachment_size,
    attachment_base64 : req.body.attachment_base64,
//    createAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss'),//作成日は更新しない
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/3/huntindex');
  });
});

// (6)既存メモの削除
router.delete('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.remove(id, function(err) {
    res.redirect('/3/huntindex');
  });
});





// (5)[]tohome
router.get('/5/toHome_menu', function(req, res) {
  memo.list(function(err, list) {
    res.render('5/toHome_menu', { version : package.version, list : list });
  });
});

// (5)[]tohome
router.get('/5/toHome_index', function(req, res) {
  memo.list(function(err, list) {
    res.render('5/toHome_index', { version : package.version, list : list });
  });
});



module.exports = router;