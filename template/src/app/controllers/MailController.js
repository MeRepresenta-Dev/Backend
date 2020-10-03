const mailTransport = require('../../config/mail');

class MailController {
  async store(req, res) {
    await mailTransport.sendMail({
      to: 'lsoares267@gmail.com',
      from: 'no-reply@merepresenta.org.br',
      subject: 'Teste de e-mail',
      template: 'email',
      context: {
        message: 'E-mail de teste da api Me Representa',
      },
    });
    return res.status(201).json({ msg: 'E-mail enviado com sucesso' });
  }

  async sendMail(req, res) {
    const { to, subject, message } = req.body;

    await mailTransport.sendMail({
      to,
      from: 'no-reply@merepresenta.org.br',
      subject,
      template: 'email',
      context: {
        message,
      },
    });
    return res.status(201).json({ msg: 'E-mail enviado com sucesso' });
  }
}

module.exports = new MailController();
