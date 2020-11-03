const express = require('express');
const path = require('path');
const multer = require('multer');
const multerConfig = require('./config/multer');
const MailController = require('./app/controllers/MailController');
const UserController = require('./app/controllers/UserController');
const SMSController = require('./app/controllers/SMSController');
const FileController = require('./app/controllers/FileController');
const TemasController = require('./app/controllers/Temas');
const FormController = require('./app/controllers/Form');
const Session = require('../src/app/models/sessions');
const User = require('./app/models/user');
const UserForm = require('./app/models/form');
const Temas = require('./app/models/temas');
const bcrypt = require('bcryptjs');
const auth = require('auth');
const authMid = require('./app/middlewares/auth');
const promisify = require('util');
const jwt = require('jsonwebtoken');


const routes = express.Router();

/**

 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

routes.get('/', (req, res) => {
    res.json({ msg: 'API OK' });
});

if (process.env.NODE_ENV === 'development') {
    routes.use(
        '/files',
        express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
}

routes.post('/user', UserController.store);
routes.post('/user', UserController.auth);

// routes.use(authMid);

routes.post('/mail', MailController.store);
routes.post('/sendmail', MailController.sendMail);

routes.post('/sms', SMSController.main);
routes.post('/sms', SMSController.sendSms);
routes.post('/validatesms', SMSController.validateSms);

routes.post('/register', UserController.register) // Cria conta no banco de dados
routes.post('/registerForm', FormController.registerForm)
//routes.post('/save', Temas.save) // Cria conta no banco de dados


routes.post('/file', multer(multerConfig).single('file'), FileController.main);

routes.get('/register', async(req, res) => {
    try {
        const { name } = req.session;
        const user = await User.findById({ _id: userId }, { name: 1, _id: 0 });

        res.json({
            title: 'Authentication successful',
            detail: 'Successfully authenticated user',
            user,
        });
    } catch (err) {
        res.status(401).json({
            errors: [{
                title: 'Unauthorized',
                detail: 'Not authorized to access this route',
                errorMessage: err.message,
            }, ],
        });
    }
});




routes.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!isEmail(email)) {
            return res.status(400).json({
                errors: [{
                    title: 'Bad Request',
                    detail: 'Email must be a valid email address',
                }, ],
            });
        }
        if (typeof password !== 'string') {
            return res.status(400).json({
                errors: [{
                    title: 'Bad Request',
                    detail: 'Password must be a string',
                }, ],
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error();
        }
        const userId = user._id;

        const passwordValidated = await bcrypt.compare(password, user.password);
        if (!passwordValidated) {
            throw new Error();
        }

        const session = await initSession(userId);

        res
            .cookie('token', session.token, {
                httpOnly: true,
                sameSite: true,
                maxAge: 1209600000,
                secure: process.env.NODE_ENV === 'production',
            })
            .json({
                title: 'Login Successful',
                detail: 'Successfully validated user credentials',
                csrfToken: session.csrfToken,
            });
    } catch (err) {
        res.status(401).json({
            errors: [{
                title: 'Invalid Credentials',
                detail: 'Check email and password combination',
                errorMessage: err.message,
            }, ],
        });
    }
});

routes.get('/me', async(req, res) => {
    try {
        const { userId } = req.session;
        const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });

        res.json({
            title: 'Authentication successful',
            detail: 'Successfully authenticated user',
            user,
        });
    } catch (err) {
        res.status(401).json({
            errors: [{
                title: 'Unauthorized',
                detail: 'Not authorized to access this route',
                errorMessage: err.message,
            }, ],
        });
    }
});

routes.delete('/me', async(req, res) => {
    try {
        const { userId } = req.session;
        const { password } = req.body;
        if (typeof password !== 'string') {
            throw new Error();
        }
        const user = await User.findById({ _id: userId });

        const passwordValidated = await bcrypt.compare(password, user.password);
        if (!passwordValidated) {
            throw new Error();
        }

        await Session.expireAllTokensForUser(userId);
        res.clearCookie('token');
        await User.findByIdAndDelete({ _id: userId });
        res.json({
            title: 'Account Deleted',
            detail: 'Account with credentials provided has been successfuly deleted',
        });
    } catch (err) {
        res.status(401).json({
            errors: [{
                title: 'Invalid Credentials',
                detail: 'Check email and password combination',
                errorMessage: err.message,
            }, ],
        });
    }
});

routes.put('/logout', async(req, res) => {
    try {
        const { session } = req;
        await session.expireToken(session.token);
        res.clearCookie('token');

        res.json({
            title: 'Logout Successful',
            detail: 'Successfuly expired login session',
        });
    } catch (err) {
        res.status(400).json({
            errors: [{
                title: 'Logout Failed',
                detail: 'Something went wrong during the logout process.',
                errorMessage: err.message,
            }, ],
        });
    }
});

module.exports = routes;
