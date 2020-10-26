const bcrypt = require('bcryptjs');
const dynamoose = require('dynamoose');
const uuid = require('uuid');

dynamoose.aws.sdk.config.update({
    region: 'us-east-1',
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET_KEY,
});

//dynamoose.local();

const UserSchema = new dynamoose.Schema({

        id: {
            type: String,
            hashKey: true,
            default: uuid.v4,
        },

        identificacao: {
            type: String,
            required: true,
        },
        cor: {
            type: String,
            required: true,
        },
        candidaturacoletiva: {
            type: String,
            required: true,
        },
        deficiencia: {
            type: String,
            required: true,
        },
        telefone: {
            type: Number,
            required: true,
        },
        
});

// UserSchema.pre('save', async function(next) {
//     const hashPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashPassword;
//     next();
// });

const UserForm = dynamoose.model('Form', UserSchema);
module.exports = UserForm;

exports.createUser = (userData) => {
    const userForm = new UserForm(userData);
    return userForm.save();
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
};

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto
            .createHmac('sha512', salt)
            .update(req.body.password)
            .digest('base64');
        req.body.password = `${salt}$${hash}`;
    }
    UserModel.patchUser(req.params.userId, req.body).then((result) => {
        res.status(204).send({});
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
            _id: id,
        },
        userData
    );
};

exports.list = (req, res) => {
    const limit =
        req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    });
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function(err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
    });
};

