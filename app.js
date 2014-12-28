/**
 * Created by Machete on 08.11.2014.
 */
var fs = require("fs");
var express = require("express");
var favicon = require('serve-favicon');
var routes = require('./routes');
var photos = require("./routes/photos");
var http = require("http");
var path = require("path");
var logger = require("express-logger");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var config = require("config");

global.appRoot = path.resolve(__dirname);

/*fs.appendFile('message.txt', 'data to append\n', function (err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
});*/

var app = express();
var env = app.settings.env;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('photos', __dirname + '/public/photos');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(logger({path: path.join(__dirname,'logs','log.txt') }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(methodOverride());

app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));

app.use(express.static(path.join(__dirname, 'public')));

if (env == 'development'){
    app.use(errorhandler());
}



app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


