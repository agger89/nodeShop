var express = require('express');
var path = require('path');
var logger = require('morgan');
// post 요청 데이터를 추출할수 있도록 만들어주는
var bodyParser = require('body-parser');

//MongoDB 접속
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('mongodb connect');
})

var connect = mongoose.connect('mongodb://127.0.0.1:27017/fastcampus', { useMongoClient: true });
autoIncrement.initialize(connect);

var admin = require('./routes/admin');

var app = express();
var port = 3000;

// 확장자가 ejs로 끝나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    res.send('First app');
});

// Routing
app.use('/admin', admin);

app.listen( port, function() {
    console.log('Express listening on port', port);
})