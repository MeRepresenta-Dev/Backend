const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const temas = require('../models/temas');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: 'us-east-1',
  });
  
class TemasController {


   async save(req, res) {
        const { genero, racismo, lgbt, povostradicionais, segurancapublica, comunicacao, democracia, meioambiente } = req.body;
                await temas.create({ answer: hash }, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ error: 'reposta salva!' })
                    }

                    return res.json({ message: 'resposta nao salva!' })
            }
    }
module.exports = new TemasController();
