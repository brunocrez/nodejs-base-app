// biblioteca para lidar com arquivos
const multer = require('multer');

// biblioteca padrão node
const path = require('path');

// biblioteca padrão node, gera conjuntos de caracteres únicos
const crypto = require('crypto');

module.exports = {    
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (erro, hash) => {
                if (erro) callback(erro);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                callback(null, file.key);
            })
        }
    })
};