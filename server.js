const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const http = require('http');
const port = process.env.PORT || 4200;
const server = http.createServer(app).listen(port);
const io = require('socket.io')({
  transports: ['xhr-polling'],
  'polling duration': 10
});
io.listen(server);


app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 

//use users route for api/users
// app.use('/api/users', usersRoute);

app.get('*', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname}); // load our public/index.html file
});

//initialize list of active characters (incl enemies) as an array
let userList = [];
let theRoom;
let currentTurn = -1;
let theBattlefield;

io.on('connection', (socket) => {
  console.log('socket connected');
  socket.emit('newUser', userList);//tell client to get user list
  socket.emit('room', theRoom);
  socket.emit('updateCurrentTurn', currentTurn);
  socket.emit('updateBattlefield', theBattlefield);

  socket.on('add', (user) => {//when a new user logs in
    console.log('user has logged in')
    user.character.clientId = socket.id;
    
    userList.push(user);//add user to active users
    socket.emit('newUser', userList);
    socket.broadcast.emit('newUser', userList);//push list of users to all clients

  });
  socket.on('updateUserList', (users) => {
    console.log('full userlist updated');
    const newUserList = users;
    newUserList.forEach((user) => {
      if (!user.character.clientId) {
        user.character.clientId = socket.id;
      }
    });
    userList = newUserList;
    socket.emit('newUser', userList);
    socket.broadcast.emit('newUser', userList);//push list of users to all clients
  });
  socket.on('addRoom', (room) => {
    theRoom = room;
    console.log('room has been added');
    socket.emit('room', room);
    socket.broadcast.emit('room', room);
  });
  socket.on('battlefieldChange', (battlefield) => {
    console.log('battlefield changed');
    theBattlefield = battlefield
    socket.emit('updateBattlefield', battlefield);
    socket.broadcast.emit('updateBattlefield', battlefield);
  });
  socket.on('turnChange', () => {
    currentTurn += 1;
    socket.emit('updateCurrentTurn', currentTurn);
    socket.broadcast.emit('updateCurrentTurn', currentTurn);
  });
  socket.on('disconnect', () => {//when someone logs out
    console.log('socket disconnected')
    for (i = 0; i < userList.length; i++){//search for that user's socket id
      if (userList[i].character.clientId == socket.id){
        userList.splice(i, 1);//remove them from list
      };
    };
    socket.emit('newUser', userList);
    socket.broadcast.emit('newUser', userList);//push new user list to all clients
    if (!userList.length) {
      theRoom = null;
      currentTurn = -1;
      socket.emit('addRoom', theRoom);
      socket.emit('updateBattlefield', []);
      socket.emit('updateCurrentTurn', -1);
      socket.broadcast.emit('addRoom', theRoom);
      socket.broadcast.emit('updateBattlefield', []);
      socket.broadcast.emit('updateCurrentTurn', -1);
    }
  });
});