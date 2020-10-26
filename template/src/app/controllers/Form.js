const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const logger = require('../../helper/logger');
const formModel = require('../models/form');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

class FormController {

    async store(req, res) {
        const form = await form.create(req.body);

        return res.status(201).json(form);
    }

   
    registerForm(req, res) {
        const { identificacao, cor, candidaturacoletiva, deficiencia } = req.body;
                await formModel.create({ identificacao, cor, candidaturacoletiva, deficiencia: hash }, (err, newUserForm) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ error: 'Atualização feita!' })
                    }

                    return res.json({ message: 'Atualização não foi feita!' })
                })
            }
    }
module.exports = new FormController();
