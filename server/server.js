const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);

const { addToDb, showAll } = require('./eventCtrl'); // user-defined db methods

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected!');
    showAll(socket);

    socket.on('disconnect', () => {
      console.log('user disconnected!');
    });

    
    // Event listeners below 
    socket.on('event', (msg) => {
      addToDb(msg.contents);
      io.emit(msg.eventOut, msg.contents);
    });
    
  });






app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


http.listen(process.env.PORT || 3000, () => console.log('✌️  on 3000'));