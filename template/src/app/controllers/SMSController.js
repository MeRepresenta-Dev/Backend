const aws = require('aws-sdk');
const logger = require('../../helper/logger');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

class SMSController {
  async main(req, res) {
    const params = {
      PhoneNumber: '5521980150741',
      Message: 'Teste de sms',
      MessageStructure: 'string',
    };

    const publishTextPromise = new aws.SNS({ apiVersion: '2010-03-31' })
      .publish(params)
      .promise();

    publishTextPromise
      .then(function (data) {
        logger.info(`MessageID is ${data.MessageId}`);
        return res.status(201).json({ msg: 'SMS Enviado com sucesso' });
      })
      .catch(function (err) {
        logger.error(err, err.stack);
        return res.status(500).json({ msg: 'Erro com disparo de SMS' });
      });
  }
}

module.exports = new SMSController();
