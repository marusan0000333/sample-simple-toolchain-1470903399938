// MemoApp - routes\index.js

// (a)使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var memo = require('../models/memo');
var package = require('../package.json');

// (b)ルーターの作成
var router = express.Router();

// (0-1)ログインページの表示(ページ表示)
router.get('/', function(req, res) {
  memo.list(function(err, list) {
    res.render('index', { version : package.version, list : list });
  });
});

// (0-2)メニューページの表示(ページ表示)
router.get('/menu', function(req, res) {
  memo.list(function(err, list) {
    res.render('menu', { version : package.version, list : list });
  });
});

// (3-1)ルート選択ページの表示(ページ表示)
router.get('/3/huntroute', function(req, res) {
  memo.list(function(err, list) {
    res.render('3/huntroute', { version : package.version, list : list });
  });
});



// (3-2-1)メモ一覧2番目の表示(ページ表示)
router.get('/3/huntindex', function(req, res) {
  memo.list(function(err, list) {
    res.render('3/huntindex', { version : package.version, list : list });
  });
});


// (3-2-2)新規メモの作成(ダイアログ表示)
router.get('/memos', function(req, res) {
  res.render('3/dialog', { id : null, doc : null });
});

// (3-2-3)既存メモの編集(ダイアログ表示)
router.get('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.get(id, function(err, doc) {
    res.render('3/dialog', { id : id, doc : doc });
  });
});

// (3-2-4)新規メモの保存
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
    attachment_type : req.body.attachment_type,
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

// (3-2-5)既存メモの保存
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
    attachment_type : req.body.attachment_type,
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

// (3-2-6)既存メモの削除
router.delete('/memos/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.remove(id, function(err) {
    res.redirect('/3/huntindex');
  });
});




// (4-1)menu
router.get('/4/createmenu', function(req, res) {
  memo.list(function(err, list) {
    res.render('4/createmenu', { version : package.version, list : list });
  });
});

// (4-2-1)メモ一覧2番目の表示(ページ表示)
router.get('/4/createindex', function(req, res) {
  memo.list(function(err, list) {
    res.render('4/createindex', { version : package.version, list : list });
  });
});


// (4-2-2)既存メモの編集(ダイアログ表示)
router.get('/memos4/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.get(id, function(err, doc) {
    res.render('4/dialog', { id : id, doc : doc });
  });
});

// (4-2-3)既存メモの保存
router.put('/memos4/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
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
    attachment_type : req.body.attachment_type,
    attachment_lastModifiedDate : req.body.attachment_lastModifiedDate,
    attachment_size : req.body.attachment_size,
    attachment_base64 : req.body.attachment_base64,
//    createAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss'),//作成日は更新しない
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/4/createindex');
  });
});






// (5-1)[]tohome
router.get('/5/toHome_menu', function(req, res) {
  memo.list(function(err, list) {
    res.render('5/toHome_menu', { version : package.version, list : list });
  });
});

// (5-2)[]tohome
router.get('/5/toHome_index', function(req, res) {
  memo.list(function(err, list) {
    res.render('5/toHome_index', { version : package.version, list : list });
  });
});




// (7-1)メモ一覧2番目の表示(ページ表示)
router.get('/7/openindex', function(req, res) {
  memo.list(function(err, list) {
    res.render('7/openindex', { version : package.version, list : list });
  });
});

// (7-2-1)既存メモの編集(ダイアログ表示)
router.get('/memos7/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.get(id, function(err, doc) {
    res.render('7/dialog', { id : id, doc : doc });
  });
});


// (7-2-2)既存メモの保存
router.put('/memos7/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
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
    public_permission : req.body.public_permission,
    attachment_name : req.body.attachment_name,
    attachment_type : req.body.attachment_type,
    attachment_lastModifiedDate : req.body.attachment_lastModifiedDate,
    attachment_size : req.body.attachment_size,
    attachment_base64 : req.body.attachment_base64,
//    createAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss'),//作成日は更新しない
    updatedAt : moment().zone('+0900').format('YYYY/MM/DD HH:mm:ss')
  };

  memo.save(id, doc, function(err) {
    res.redirect('/7/openindex');
  });
});





// (8-1)メモ一覧2番目の表示(ページ表示)
router.get('/8/viewindex', function(req, res) {
  memo.list(function(err, list) {
    res.render('8/viewindex', { version : package.version, list : list });
  });
});

// (8-2-1)既存メモの編集(ダイアログ表示)
router.get('/memos8/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', function(req, res) {
  var id = req.param('id');

  memo.get(id, function(err, doc) {
    res.render('8/dialog', { id : id, doc : doc });
  });
});

module.exports = router;