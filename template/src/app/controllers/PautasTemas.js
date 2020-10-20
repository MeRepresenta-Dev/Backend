const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/pontoCandidato');

class PautasController {


    register(req, res) {
        const { id, answer } = req.body;
        bcrypt.hash(password, 9)
            .then(async(hash) => {
                await userModel.create({ answer: hash }, (err, newAnswer) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ error: 'reposta salva!' })
                    }

                    return res.json({ message: 'resposta nao salva!' })
                })
            })
    }
}
module.exports = new PautasController();