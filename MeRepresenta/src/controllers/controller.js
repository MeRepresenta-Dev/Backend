const mongoose = require('mongoose');
const User = mongoose.model('Users');

// list
exports.listUser = async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as usuários.'});
  }
};

// create
exports.createUser = async (req, res) => {
  try {
    const user = new User({
      user: req.body.friend,
      content: req.body.mention
    });

    console.log(user)

    await user.save();

    res.status(201).send({message: 'Candidato cadastrada com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar candidato.'});
  }
};