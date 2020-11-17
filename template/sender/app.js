const fs = require('fs');
const csv = require('csv-parser');
const { resolve } = require('path');
const logger = require('../src/helper/logger');
const mailTransport = require('../src/config/mail');

const filePath = resolve(__dirname, 'base_ver_2020_dedu_sguf.csv');

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', async function (data) {
    try {
      const dataParsed = data['0'];
      const email = dataParsed.split('|');

      await sendMail(email);
    } catch (err) {
      logger.error(err);
    }
  })
  .on('end', function () {
    logger.info('Finish');
  });

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
