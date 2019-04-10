const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-m4fnj.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    });

// entender as requisições em formato JSON
app.use(express.json());

// permite o envio de arquivos nas requisições
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

app.listen(3000);