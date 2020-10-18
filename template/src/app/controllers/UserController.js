const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

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
        const { name, email, password, cpf, telefone, secao, facebook, instagram, twitter } = req.body;
        bcrypt.hash(password, 9)
            .then(async(hash) => {
                await userModel.create({ name, email, password, cpf, telefone, secao, facebook, instagram, twitter: hash }, (err, newUser) => {
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
