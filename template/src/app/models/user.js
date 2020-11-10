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

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    telefone: {
        type: Number,
        required: true,
    },
    secao: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
       
    },
    instagram: {
        type: String,
        
    },
    twitter: {
        type: String,
        
    },

    photo: {
        type: String,
        required: true,

    },
   descricaoCandidaturaColetiva: {
        type: String,
        required: true,

    },
  
  cor: {
        type: String,
        required: true,
    },
  
  orientacaoSexualAfetiva: {
        type: String,
        required: true,
    },
  

    pauta1: {
        type: String,
        required: true,

    },

    pauta2: {
        type: String,
        required: true,

    },

    pauta3: {
        type: String,
        required: true,

    },
  
  pauta4: {
        type: String,
        required: true,

    },
    pauta5: {
        type: String,
        required: true,

    },

    pauta6: {
        type: String,
        required: true,

    },

    pauta7: {
        type: String,
        required: true,

    },

    pauta8: {
        type: String,
        required: true,

    },

    pauta9: {
        type: String,
        required: true,

    },


    pauta10: {
        type: String,
        required: true,

    },


    pauta11: {
        type: String,
        required: true,

    },



    pauta12: {
        type: String,
        required: true,

    },

    pauta13: {
        type: String,
        required: true,

    },

    pauta14: {
        type: String,
        required: true,

    },


    pauta15: {
        type: String,
        required: true,

    },



    pauta16: {
        type: String,
        required: true,

    },


    pauta17: {
        type: String,
        required: true,

    },

    pauta18: {
        type: String,
        required: true,

    },


    pauta19: {
        type: String,
        required: true,

    },


    pauta20: {
        type: String,
        required: true,

    },


    pauta21: {
        type: String,
        required: true,

    },

    pauta22: {
        type: String,
        required: true,

    },


    pauta23: {
        type: String,
        required: true,

    },


    pauta24: {
        type: String,
        required: true,

    },

    genero: {
        type: Number,
        required: true,
    },
    raca: {
        type: Number,
        required: true,
    },
    lgbt: {
        type: Number,
        required: true,
    },
    povostradicionais: {
        type: Number,
        required: true,
    },
    politicassociais: {
        type: Number,
        required: true,
    },
    segurancapublica: {
        type: Number,
        required: true,
    },
    drogas: {
        type: Number,
        required: true,
    },
    comunicacao: {
        type: Number,
        required: true,
    },
    democracia: {
        type: Number,
        required: true,
    },

    meioambiente: {
        type: Number,
        required: true,

    },


});

// UserSchema.pre('save', async function(next) {
//     const hashPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashPassword;
//     next();
// });

const User = dynamoose.model('User', UserSchema);
module.exports = User;

exports.createUser = (userData) => {
    const user = new User(userData);
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

function requestVerificationCode(PhoneNumber) {
    const url = `${apiBaseUrl}/request-verification-code`;
    const headers = new Headers();
    headers.append('Content-Type', defaultHeaders['Content-Type']);
    const body = JSON.stringify({ phoneNumber: phone });
    const init = {
        method: 'POST',
        mode: 'no-cors',
        headers,
        body
    };
    const request = new Request(url);
    return fetch(request, init);
}

function verifyVerificationCode(code, PhoneNumber) {
    const url = `${apiBaseUrl}/verify-verification-code`;
    const headers = new Headers();
    headers.append('Content-Type', defaultHeaders['Content-Type']);
    const body = JSON.stringify({
        verificationCode: code,
        phoneNumber
    });
    const init = {
        method: 'POST',
        mode: 'no-cors',
        headers,
        body
    };
    const request = new Request(url);
    return fetch(request, init);
}
