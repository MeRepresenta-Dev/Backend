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
      PhoneNumber: '',
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

  async sendSms(req, res) {
    const { PhoneNumber, Message } = req.body;

    const params = {
      PhoneNumber,
      Message,
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

  async validateSms(req, res){
    const {code} = req.body;

    if(!code){
      return res.status(400).json({msg: 'No code provided'});
    }

    return res.json({msg: 'Code ok'});
  }
}

module.exports = new SMSController();
