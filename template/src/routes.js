const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const MailController = require('./app/controllers/MailController');
const UserController = require('./app/controllers/UserController');
const SMSController = require('./app/controllers/SMSController');
const authMid = require('./app/middlewares/auth');

routes.get('/', (req, res) => {
  res.json({ msg: 'API OK' });
});

routes.post('/user', UserController.store);
routes.post('/user', UserController.auth);

// routes.use(authMid);

routes.post('/mail', MailController.store);
routes.post('/sms', SMSController.main);

module.exports = routes;
