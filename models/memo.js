// MemoApp ? models\memo.js (Cloudant版)

// (a)使用モジュールの読み込み
var cradle = require('cradle');

// (b)Cloudant接続情報の取得
var services = JSON.parse(process.env.VCAP_SERVICES);
var credentials = services['cloudantNoSQLDB'][0].credentials;
var host = credentials.host;
var port = credentials.port;
var options = {
  cache : true,
  raw : false,
  secure : true,
  auth : {
    username : credentials.username,
    password : credentials.password
  }
};

// (c)メモ・データを保持するデータベース
var db = new (cradle.Connection)(host, port, options).database('memo');

// (1)メモ一覧の取得
exports.list = function(callback) {
  db.view('memos/list', { descending : true }, callback);
};

// (2)メモの取得
exports.get = function(id, callback) {
  db.get(id, callback);
};

// (3)メモの保存
exports.save = function(id, doc, callback) {
  db.save(id, doc, callback);
};

// (4)メモの削除
exports.remove = function(id, callback) {
  db.remove(id, callback);
};