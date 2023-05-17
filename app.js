const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParser=require('body-parser')
const { MongoClient } = require('mongodb');
const mongoose=require('mongoose')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travel_buddy', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

  const db=mongoose.connection;
// Serve static files from the 'proj' directory
app.use(express.static(path.join(__dirname, 'proj')));

// serve the homepage.html file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'homepage.html'));
});

// redirect to friends.html on clicking friends img
app.get('/friends', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'friends.html'));
});

// redirect to login.html on clicking login img
app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'login.html'));
});

app.get('/homepage', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'homepage.html'));
});

app.get('/confirm', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'confirm.html'));
});

app.get('/confirmation', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'confirm.html'));
});

app.get('/menu', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'menu.html'));
});

app.get('/modify_friends_list', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'modify_friends_list.html'));
});

app.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'register.html'));
});

app.get('/new_route', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'new_route.html'));
});

app.get('/tools', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'tools.html'));
});

app.get('/contactus', function(req, res) {
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'contactus.html'));
});
app.get('/texteditor',function(req,res){
  res.sendFile(path.join(__dirname, 'proj', 'pages', 'texteditor.html'));
});
// start the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// a variable to save a session
var session;

app.post('/login', (req, res) => {
  session = req.session;
  session.Email = req.body.Email;
  session.Password = req.body.Password;
  session.source='';
  session.destination='';
  console.log(req.session);
  var data={
    "email":session.Email,
    'date':new Date(),
  }
  db.collection('logins').insertOne(data,(err,collection)=>{
    if(err){
      throw err;
    }
    console.log("record inserted successfully");
  })
  res.redirect('/homepage')
  
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
  console.log(req.session)
});
app.get('/checksession', (req, res) => {
  if (req.session && req.session.Email && req.session.Password) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post("/register",(req,res)=>{
  var name=req.body.Name;
  var email=req.body.Email;
  var password=req.body.Password;

  var data={
    "name":name,
    'email':email,
    "password":password
  }
  db.collection('registrations').insertOne(data,(err,collection)=>{
    if(err){
      throw err;
    }
    console.log("record inserted successfully");
    return res.redirect("/login")
  })
})

const request = require('request');

app.post('/query', (req, res) => {
  session = req.session; // Retrieve session data
  session.source = req.body.source;
  session.destination = req.body.destination;
  var data={
    "source":req.body.source,
    'destination':req.body.destination,
    "date":req.body.date
  }
  db.collection('query').insertOne(data,(err,collection)=>{
    if(err){
      throw err;
    }
    console.log("record inserted successfully");
    console.log(session);
    res.redirect('/menu');
  })
  });

app.post('/menu', (req, res) => {
  const src = req.body.source;
  const dest = req.body.destination;
  const date = req.body.date;
  console.log(src,dest,date)
  // Do something with the form data (e.g. save to database)
  res.send('Form data received successfully');
});

app.post("/new_route", (req, res) => {
  const src = req.body.source;
  const dest = req.body.destination;
  const date = req.body.date;
  const email = req.session.Email;

  const data = {
    source: src,
    destination: dest,
    date: date,
    email: email
  };

  db.collection('routes').insertOne(data, (err, result) => {
    if (err) {
      throw err;
    }
    
    console.log("Record inserted successfully");

    // Get the inserted record's ObjectID
    const insertedId = result.insertedId;

    // Insert the ObjectID and email into the "riders" table
    const ridersData = {
      rideId: insertedId,
      email: email
    };

    db.collection('riders').insertOne(ridersData, (err, result) => {
      if (err) {
        throw err;
      }

      console.log("Rider added to database successfully");
      res.redirect("/confirm");
    });
  });
});



  // Define a route to get the confirmed rides
  app.get('/rides', (req, res) => {
    const collection = db.collection('confirmed_rides');
    collection.find({}).toArray((err, docs) => {
      assert.equal(null, err);
      res.json(docs);
    });
  });

  app.use(router);

  app.post('/submitgrievance', (req, res) => {
    // Get the form data
    const email = req.body.email;
    const grev = req.body.grievance;
    var date=new Date();

    // Insert the ride into the "confirmed_rides" collection
    const collection = db.collection('grievances');
    collection.insertOne({ email: email, grievances: grev, date: date}, (err, result) => {
      console.log('Ride added to database successfully');
      res.redirect('/contactus');
    });
  });
 

  const { ObjectId } = require('mongodb');
  const assert = require('assert');

  app.post('/confirm_menu_ride', (req, res) => {
    const collection = db.collection('riders');
    const rideId = new ObjectId(req.body.rideId); // Convert ID to ObjectId

    collection.insertOne({ 'rideId': rideId, email: req.session.Email }, (err, result) => {
        assert.equal(null, err);
        console.log('Ride added to database successfully');
        res.redirect('/confirmation');
    });
});
  

const routeSchema = new mongoose.Schema({
  source: String,
  destination: String,
  date: String
});

const Route = mongoose.model('Route', routeSchema, 'routes');
router.get('/getroutes', function(req, res) {
  console.log('GET request for all info');
  const session = req.session;
  const source = session.source;
  const destination = session.destination;
  
  Route.find({ source: source, destination: destination })
    .exec()
    .then((routes) => {
      res.json(routes);
    })
    .catch((err) => {
      console.log('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    });
});

  
  
  app.post('/save_friends', (req, res) => {
    const sessionEmail = req.session.Email;
    const friendsEmails = req.body.friendsEmails;
    
    // Update the 'friends' collection in the database
    db.collection('friends').updateOne(
      { email: sessionEmail }, // Find the document with the matching email
      { $set: { friendsEmails: friendsEmails } }, // Update the 'friendsEmails' field
      { upsert: true }, // Create the document if it doesn't exist
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log('Friends list saved successfully');
        res.send('Friends list saved successfully');
      }
    );
  });
  
  // Update the '/friends' route to fetch the friends list from the database
  app.get('/friends', (req, res) => {
    const sessionEmail = req.session.Email;
  
    // Retrieve the friends list for the current session's email
    db.collection('friends').findOne(
      { email: sessionEmail },
      (err, result) => {
        if (err) {
          throw err;
        }
        const friendsEmails = result ? result.friendsEmails : [];
        res.send(friendsEmails);
      }
    );
  }); 
    
  