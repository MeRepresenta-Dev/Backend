// colocar o codigo da pontuacao aqui 
const bcrypt = require('bcryptjs');
const dynamoose = require('dynamoose');
const uuid = require('uuid');

dynamoose.aws.config.update({
    region: 'us-east-1',
});

dynamoose.local();

const AnswerSchema = new dynamoose.Schema({

        id: {
            type: String,
            hashKey: true,
            default: uuid.v1(),
        },

        answer: {
            type: String,
            required: true,
        },

    },

    {
        timestamps: true,
    }
);


AnswerSchema.pre('save', async function(next) {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    next();
});

const Answer = dynamoose.model('Answer', UserSchema);
module.exports = User;

exports.createAnswer = (userData) => {
    const answer = new Answer(userData);
    return user.save();
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

