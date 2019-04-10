const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// módulo que determina que pode acessar a aplicação
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

// socket é a representação da conexão do usuário com o servidor em real time
io.on('connection', socket => {
    // requisição do front end chamando connectRoom
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-m4fnj.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    });

app.use((req, res, next) => {
    req.io = io;

    return next();
});

// entender as requisições em formato JSON
app.use(express.json());

// permite o envio de arquivos nas requisições
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

// aplicação escutando requisições http e web socket
server.listen(3000);