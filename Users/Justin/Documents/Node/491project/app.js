//var site_name - 'Whiteboard';

var express = require('express')
    , app = module.exports = express();


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/491project', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});


// Using the .html extension instead of
// having to name the views as *.ejs
app.engine('.html', require('ejs').__express);

//Allows static files
//app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

// Set the folder where the pages are kept
app.set('views', __dirname + '/views');
 
// This avoids having to provide the 
// extension to res.render()
app.set('view engine', 'html');
 
/*
example of rendering a list
initalize array of values
set foreach in html through messages

var messages = [
  { name: 'Nathan Explosion', message: 'Dethklok rules' },
  { name: 'William Murderface', message: 'Bass is the heart of the band' },
  { name: 'Dr. Rockso', message: 'Where is my friend Toki?' }
];
 */
app.use(express.static(__dirname));


// Serve the index page
app.get('/', function(req, res){
  res.render('index', {
    pageTitle: 'Whiteboard',
    siteName: 'Whiteboard',
    //siteName: site_name,
    //messages: messages
  });
});

 
if (!module.parent) {
  app.listen(8080);
  console.log('EJS Demo server started on port 8080' + __dirname);
}