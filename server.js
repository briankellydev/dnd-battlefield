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
let rooms = {};

io.on('connection', (socket) => {
  console.log('socket connected');
  socket.emit('availableRooms', Object.keys(rooms));
  socket.on('add', (user) => {//when a new user logs in
    console.log('user has logged in')
    user.character.clientId = socket.id;
    socket.room = user.roomId;
    socket.join(user.roomId)
    rooms[user.roomId].userList.push(user);//add user to active users
    socket.broadcast.to(user.roomId).emit('newUser', rooms[user.roomId].userList);//push list of users to all clients
    socket.emit('newUser', rooms[user.roomId].userList);//tell client to get user list
    socket.emit('room', rooms[user.roomId]);
    socket.emit('updateCurrentTurn', rooms[user.roomId].currentTurn);
    socket.emit('updateBattlefield', rooms[user.roomId].battlefield);
    socket.emit('mapListChanged', rooms[user.roomId].maps);
    socket.emit('screenIndexChanged', rooms[user.roomId].currentScreenIndex);
    socket.emit('updateToken', rooms[user.roomId].tokenLocation);
    rooms[user.roomId].socketList.push(socket.id);
  });
  socket.on('updateUserList', (users) => {
    console.log('full userlist updated');
    const newUserList = users;
    newUserList.forEach((user) => {
      if (!user.character.clientId) {
        user.character.clientId = socket.id;
      }
    });
    rooms[socket.room].userList = newUserList;
    socket.emit('newUser', rooms[socket.room].userList);
    socket.broadcast.to(socket.room).emit('newUser', rooms[socket.room].userList);//push list of users to all clients
  });
  socket.on('addRoom', (room) => {
    rooms[room.id] = {
      ...room,
      userList: [],
      currentTurn: -1,
      battlefield: [],
      socketList: [socket.id],
      maps: [],
      currentScreenIndex: 0,
      tokenLocation: [-200, -200]
    };
    socket.room = room.id;
    socket.join(room.id);
    console.log('room has been added');
    socket.emit('room', room);
    socket.broadcast.to(room.id).emit('room', room);
    socket.emit('availableRooms', Object.keys(rooms));
    socket.broadcast.emit('availableRooms', Object.keys(rooms));
  });
  socket.on('battlefieldChange', (battlefield) => {
    console.log('battlefield changed');
    rooms[socket.room].battlefield = battlefield
    socket.emit('updateBattlefield', rooms[socket.room].battlefield);
    socket.broadcast.to(socket.room).emit('updateBattlefield', rooms[socket.room].battlefield);
  });
  socket.on('turnChange', () => {
    if (rooms[socket.room].currentTurn + 1 === rooms[socket].userList.length) {
      rooms[socket.room].currentTurn = 0;
    } else {
      rooms[socket.room].currentTurn += 1;
    }
    socket.emit('updateCurrentTurn', rooms[socket.room].currentTurn);
    socket.broadcast.to(socket.room).emit('updateCurrentTurn', rooms[socket.room].currentTurn);
  });
  socket.on('changeMapList', (mapList) => {
    rooms[socket.room].maps = mapList;
    socket.emit('mapListChanged', rooms[socket.room].maps);
    socket.broadcast.to(socket.room).emit('mapListChanged', rooms[socket.room].maps);
  });
  socket.on('changeScreenIndex', (idx) => {
    rooms[socket.room].currentScreenIndex = idx;
    socket.emit('screenIndexChanged', rooms[socket.room].currentScreenIndex);
    socket.broadcast.to(socket.room).emit('screenIndexChanged', rooms[socket.room].currentScreenIndex);
  });
  socket.on('tokenPlaced', (location) => {
    rooms[socket.room].tokenLocation = location;
    socket.emit('updateToken', rooms[socket.room].tokenLocation);
    socket.broadcast.to(socket.room).emit('updateToken', rooms[socket.room].tokenLocation);
  });
  socket.on('sendMessage', (message) => {
    socket.emit('message', message);
    socket.broadcast.to(socket.room).emit('message', message);
  });
  socket.on('disconnect', () => {//when someone logs out
    console.log('socket disconnected')
    if (socket.room) {
      for (i = 0; i < rooms[socket.room].socketList.length; i++){//search for that user's socket id
        if (rooms[socket.room].socketList[i] === socket.id){
          rooms[socket.room].socketList.splice(i, 1);//remove them from list
        };
      };
      socket.emit('newUser', rooms[socket.room].userList);
      socket.broadcast.to(socket.room).emit('newUser', rooms[socket.room].userList);//push new user list to all clients
      if (!rooms[socket.room].socketList.length) {
        delete rooms[socket.room];
      }
    }
    
  });
});