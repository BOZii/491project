
//Requires
var express = require('express')
    , app = module.exports = express();


var mongoose = require('mongoose');

//Database
mongoose.connect('mongodb://localhost/491project', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

//Schemas
var Schema = mongoose.Schema;

var User = new Schema({  
    username: { type: String, required: true },  
    passhash: { type: String, required: true },  
    type: { type: String, required: true },  
    modified: { type: Date, default: Date.now }
});

var UserModel = mongoose.model('User', User);

// Using the .html extension instead of
// having to name the views as *.ejs
app.engine('.html', require('ejs').__express);

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
 //Allows the use of static files
app.use(express.static(__dirname));




//READ USER
app.get('/api/users', function (req, res){
  return UserModel.find(function (err, users) {
    if (!err) {
      return res.send(users);
    } else {
      return console.log(err);
    }
  });
});

//CREATE user
app.post('/api/users', function (req, res){
  var user;
  console.log("POST: ");
  console.log(req.body);
  user = new UserModel({
    username: req.body.username,
    passhash: req.body.passhash,
    type: req.body.type,
  });
  user.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(user);
});

//READ by id
app.get('/api/users/:id', function (req, res){
  return UserModel.findById(req.params.id, function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return console.log(err);
    }
  });
});

//UPDATE user by id
app.put('/api/users/:id', function (req, res){
  return UserModel.findById(req.params.id, function (err, user) {
    user.username = req.body.username;
    user.passhash = req.body.passhash;
    user.type = req.body.type;
    return user.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(user);
    });
  });
});

//DELETE user by id
app.delete('/api/users/:id', function (req, res){
  return UserModel.findById(req.params.id, function (err, user) {
    return user.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// Serve the index page
app.get('/', function(req, res){
  res.render('index', {
    pageTitle: 'Whiteboard',
    siteName: 'Whiteboard',
    //siteName: site_name,
    //messages: messages
  });
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

 
if (!module.parent) {
  app.listen(8080);
  console.log('EJS Demo server started on port 8080' + __dirname);
}