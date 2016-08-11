/*eslint-env node */
// MemoApp â models\memo.js (Cloudantç)

// (a)ä½¿ç¨ã¢ã¸ã¥ã¼ã«ã®èª­ã¿è¾¼ã¿
var cradle = require('cradle');

// (b)Cloudantæ¥ç¶æå ±ã®åå¾
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

// (c)ã¡ã¢ã»ãã¼ã¿ãä¿æãããã¼ã¿ãã¼ã¹
var db = new (cradle.Connection)(host, port, options).database('memo');

// (1)ã¡ã¢ä¸è¦§ã®åå¾
exports.list = function(callback) {
  db.view('memos/list', { descending : true }, callback);
};

// (2)ã¡ã¢ã®åå¾
exports.get = function(id, callback) {
  db.get(id, callback);
};

// (3)ã¡ã¢ã®ä¿å­
exports.save = function(id, doc, callback) {
  db.save(id, doc, callback);
};

// (4)ã¡ã¢ã®åé¤
exports.remove = function(id, callback) {
  db.remove(id, callback);
};