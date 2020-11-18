require('dotenv').config();

const userModel = require('./user_model');
const logger = require('../src/helper/logger');
const mailTransport = require('../src/config/mail');

const sendMail = async (to) => {
  await mailTransport.sendMail({
    to,
    from: 'no-reply@merepresenta.org.br',
    subject: 'Teste de e-mail',
    template: 'email',
    context: {
      message: 'Substitua o conteudo do email',
    },
  });
};

const main = async () => {
  logger.info('Iniciando o disparo de e-mails para usuários da base de dados');
  try {
    const users = await userModel.scan().exec();
    users.map(async (user) => {
      await sendMail(user.email);
      logger.info(`Disparado para: ${user.email}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

main();
