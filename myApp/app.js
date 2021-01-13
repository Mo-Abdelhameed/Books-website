var express = require('express');
var path = require('path');
var fs = require('fs');
var currentUser ;
var currentUserIndex;
var books = ["The Sun and Her Flowers","To Kill a Mockingbird","Leaves of Grass","Dune","Lord of the Flies","The Grapes of Wrath"];
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret-key',
  resave: 'false',
  saveUninitialized: 'false',
}));



app.get('/', function(req, res){
  res.render('login', {x: "Enter username and password", y: ''});

});
app.get('/dune', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
    res.render('dune', {x: ""});
});
app.get('/fiction', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('fiction');
});
app.get('/flies', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('flies', {x: ""});
});
app.get('/grapes', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('grapes', {x: ""});
});
app.get('/home', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('home');
});
app.get('/leaves', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('leaves', {x: ""});
});

app.get('/login', function(req, res){
  res.render('login', {x: "Enter username and password", y: ''});
});
app.get('/mockingbird', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('mockingbird', {x: ""});
});
app.get('/novel', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('novel');
});
app.get('/poetry', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else  
  res.render('poetry');
});
app.get('/readlist', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  
  else{
    var arr = JSON.parse(fs.readFileSync('users.json'));
    res.render('readlist', {l: arr[req.session.currentUserIndex].list});
  } 
  
});

app.get('/registration', function(req, res){
  res.render('registration', {x: 'Enter username and password', y: ''});
});
app.get('/searchresults', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else
    res.render('searchresults', {l: req.session.resList});
});
app.get('/sun', function(req, res){
  if(req.session.currentUser == null)
    res.redirect('login');
  else
    res.render('sun', {x: ""});
});
app.post('/register', function(req, res){
  var info = req.body;
  if(info.username == ''){
    res.render('registration', {x: 'Enter username and password', y: 'Username should be at least 1 character'});
    return;
  }
  if(info.password == ''){
    res.render('registration', {x: 'Enter username and password', y: 'Password should be at least 1 character'});
    return;
  }
  var arr = JSON.parse(fs.readFileSync('users.json'));
  for(let i of arr){
   if(info.username == i.username){
      res.render('registration', {x: 'Enter username and password', y: 'Username is taken'});
      return;
   }   
  }
  info.list = [];
  arr.push(info);
  fs.writeFileSync('users.json', JSON.stringify(arr));
  res.redirect('login');
});

app.post('/login', function(req, res){
  var info = req.body;
  var arr = JSON.parse(fs.readFileSync('users.json'));
  var iteration = 0;
  for(let i of arr){
    if(info.username == i.username)
      if(info.password == i.password){
        req.session.currentUser = i.username;
        req.session.currentUserIndex = iteration;
        res.redirect('home');
        return;
      }
      else{
        res.render('login', {x:'Enter username and password', y: 'Incorrect password'});
        return;
      }
      iteration++;
  }
  res.render('login', {x:'Enter username and password', y: 'Username not found'});
});

app.post('/sun', function(req, res){
  if(req.session.currentUser == null){
       res.redirect('login');
       return;
     }
  console.log(req.session.currentUser);
  let index = -1;
  let iteration = 0;
  var arr = JSON.parse(fs.readFileSync('users.json'));
  for(let i of arr){
    if(req.session.currentUser == i.username){
      index = iteration;
      for(let j of i.list)
        if(j.localeCompare('The Sun and Her Flowers') == 0){
          res.render('sun', {x: 'The book is already in the list'});
          return;
      }
      break;
    }
    iteration++;
  }
  arr[index].list.push('The Sun and Her Flowers');
  fs.writeFileSync('users.json', JSON.stringify(arr));
  res.render('sun', {x: 'The book is added to the list'});
});

app.post('/flies', function(req, res){
  if(req.session.currentUser == null){
    res.redirect('login');
    return;
  }
  let index = -1;
  let iteration = 0;
  var arr = JSON.parse(fs.readFileSync('users.json'));
  for(let i of arr){
    if(req.session.currentUser == i.username){
      index = iteration;
      for(let j of i.list)
        if(j.localeCompare('Lord of the Flies') == 0){
          res.render('flies', {x: 'The book is already in the list'});
          return;
      }
      break;
    }
    iteration++;
  }
  arr[index].list.push('Lord of the Flies');
  fs.writeFileSync('users.json', JSON.stringify(arr));
  res.render('flies', {x: 'The book is added to the list'});
});

app.post('/grapes', function(req, res){
   if(req.session.currentUser == null){
     res.redirect('login');
     return;
   }
  let index = -1;
  let iteration = 0;
  var arr = JSON.parse(fs.readFileSync('users.json'));
  for(let i of arr){
    if(req.session.currentUser == i.username){
      index = iteration;
      for(let j of i.list)
        if(j.localeCompare('The Grapes of Wrath') == 0){
          res.render('grapes', {x: 'The book is already in the list'});
          return;
      }
      break;
    }
    iteration++;
  }
  arr[index].list.push('The Grapes of Wrath');
  fs.writeFileSync('users.json', JSON.stringify(arr));
  res.render('grapes', {x: 'The book is added to the list'});
});

app.post('/leaves', function(req, res){
  if(req.session.currentUser == null){
    res.redirect('login');
    return;
  }
  let index = -1;
  let iteration = 0;
  var arr = JSON.parse(fs.readFileSync('users.json'));
  for(let i of arr){
    if(req.session.currentUser == i.username){
      index = iteration;
      for(let j of i.list)
        if(j.localeCompare('Leaves of Grass') == 0){
          res.render('leaves', {x: 'The book is already in the list'});
          return;
      }
      break;
    }
    iteration++;
  }
  arr[index].list.push('Leaves of Grass');
  fs.writeFileSync('users.json', JSON.stringify(arr));
  res.render('leaves', {x: 'The book is added to the list'});
});

app.post('/dune', function(req, res){
  if(req.session.currentUser == null){
    res.redirect('login');
    return;
  }
  let index = -1;
  let iteration = 0;
  var arr = JSON.parse(fs.readFileSync('users.json'));
  for(let i of arr){
    if(req.session.currentUser == i.username){
      index = iteration;
      for(let j of i.list)
        if(j.localeCompare('Dune') == 0){
          res.render('dune', {x: 'The book is already in the list'});
          return;
      }
      break;
    }
    iteration++;
  }
  arr[index].list.push('Dune');
  fs.writeFileSync('users.json', JSON.stringify(arr));
  res.render('dune', {x: 'The book is added to the list'});
});
app.post('/mockingbird', function(req, res){
  if(req.session.currentUser == null){
    res.redirect('login');
    return;
  }
  let index = -1;
  let iteration = 0;
  var arr = JSON.parse(fs.readFileSync('users.json'));
  for(let i of arr){
    if(req.session.currentUser == i.username){
      index = iteration;
      for(let j of i.list)
        if(j.localeCompare('To Kill a Mockingbird') == 0){
          res.render('mockingbird', {x: 'The book is already in the list'});
          return;
      }
      break;
    }
    iteration++;
  }
  arr[index].list.push('To Kill a Mockingbird');
  fs.writeFileSync('users.json', JSON.stringify(arr));
  res.render('mockingbird', {x: 'The book is added to the list'});
});

app.post('/search', function(req, res){
  var info = req.body.Search;
  var results = [];
  for(i of books){
    if(i.toLowerCase().includes(info.toLowerCase()))
      results.push(i);
    //console.log(i.toLowerCase() + " " + info.toLowerCase());
  }
    req.session.resList = results;
    res.redirect('searchresults');
  

  //l.toLowerCase
});

if(process.env.PORT)
  app.listen(process.env.PORT, ()=>{console.log('Server Started!');});
else
  app.listen(3000, ()=>{console.log('The server is running on port 3000');});

