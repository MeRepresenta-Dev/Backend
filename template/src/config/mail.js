const nodemailer = require('nodemailer');
const nodemailerhbs = require('nodemailer-express-handlebars');
const aws = require('aws-sdk');
const expresshbs = require('express-handlebars');
const { resolve } = require('path');

const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

const transporterType = process.env.NODE_ENV === 'development' ? 'smtp' : 'ses';

const transporter = {
  ses: nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion: '2010-12-01',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
    }),
  }),

  smtp: nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  }),
};

transporter[transporterType].use(
  'compile',
  nodemailerhbs({
    viewEngine: expresshbs.create({
      layoutsDir: resolve(viewPath, 'layouts'),
      partialsDir: resolve(viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs',
    }),
    viewPath,
    extName: '.hbs',
  })
);

module.exports = transporter[transporterType];
