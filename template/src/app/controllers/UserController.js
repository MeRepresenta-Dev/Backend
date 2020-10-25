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

class UserController {

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

    register(req, res) {
        const { name, email, password, cpf, telefone, secao, facebook, instagram, twitter, photo } = req.body;

        const code = Math.floor(1000 + Math.random() * 9000);

        const params = {
          PhoneNumber: telefone,
          Message: `Me Representa - código: ${code}`,
          MessageStructure: 'string',
        };

        const publishTextPromise = new aws.SNS({ apiVersion: '2010-03-31' })
        .publish(params)
        .promise();

        publishTextPromise
          .then(function (data) {
            logger.info(`MessageID is ${data.MessageId}`);
          })
          .catch(function (err) {
            logger.error(err, err.stack);
          });


        bcrypt.hash(password, 9)
            .then(async(hash) => {
                await userModel.create({ name, email, password, cpf, telefone, secao, facebook, instagram, photo, twitter: hash }, (err, newUser) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ error: 'O Usuário já existe!' })
                    }

                    return res.json({ message: 'Usuário foi criado!' })
                })
            })
    }
}
module.exports = new UserController();
