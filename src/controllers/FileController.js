const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
    async store (req, res) {
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        })

        box.files.push(file);

        await box.save();

        // as ações feitas na box em questão serão refletidas para usuários conectados nessa box por dipositivos diferentes em real time
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();