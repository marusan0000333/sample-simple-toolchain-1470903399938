/*eslint-env node*/


/*
//------------------------------------------------------------------------------
// hello world app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
 */


// MemoApp - app.js

// (a)使用モジュールの読み込み
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');

// (b)アプリケーションの作成
var app = express();

// (c)ビューの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// (d)ミドルウェアの設定
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride('_method'));

// (e)ルーティングの設定
app.use('/', routes);

// (e2)staticルーティングの設定
// serve the files out of ./public as our main files
app.use('/static', express.static(__dirname + '/public'));

// (f)リクエストの受け付け
var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
});

