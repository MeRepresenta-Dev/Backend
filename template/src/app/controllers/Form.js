const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const logger = require('../../helper/logger');
const userModel = require('../models/user');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

class FormController {

    async store(req, res) {
        const user = await userModel.create(req.body);

        user.password = undefined;

        return res.status(201).json(user);
    }

    async auth(req, res) {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email,
        });

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                error: 'Credenciais invalidas',
            });
        }

        const { _id: id } = user;

        const token = jwt.sign({
                id,
            },
            process.env.JWT_KEY, {
                expiresIn: '1d',
            }
        );

        return res.json({
            token,
        });
    }

    registerForm(req, res) {
        const {identificacao, cor, candidaturacoletiva, deficiencia} = req.body;
        bcrypt.hash(password, 9)
            .then(async(hash) => {
                await userModel.create({ name, email, password, cpf, telefone, secao, facebook, instagram, photo, twitter: hash }, (err, newUser) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ error: 'Atualização feita!' })
                    }

                    return res.json({ message: 'Atualização não foi feita!' })
                })
            })
    }
}
module.exports = new FormController();
