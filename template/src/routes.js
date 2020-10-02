const express = require('express');
const path = require('path');
const multer = require('multer');
const multerConfig = require('./config/multer');
const MailController = require('./app/controllers/MailController');
const UserController = require('./app/controllers/UserController');
const SMSController = require('./app/controllers/SMSController');
const FileController = require('./app/controllers/FileController');
const authMid = require('./app/middlewares/auth');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'API OK' });
});

if (process.env.NODE_ENV === 'development') {
  routes.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
  );
}

routes.post('/user', UserController.store);
routes.post('/user', UserController.auth);

// routes.use(authMid);

routes.post('/mail', MailController.store);
routes.post('/sms', SMSController.main);
routes.post('/file', multer(multerConfig).single('file'), FileController.main);

module.exports = routes;
