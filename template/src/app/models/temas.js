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

        genero: {
            type: String,
            hashKey: true,
            default: uuid.v4,
        },

        racismo: {
            type: String,
            required: true,
        },
        lgbt: {
            type: String,
            required: true,
        },
        povostradicionais: {
            type: String,
            required: true,
        },
        segurancapublica: {
            type: String,
            required: true,
        },
        comunicacao: {
            type: String,
            required: true,
        },
        democracia: {
            type: String,
            required: true,
        },
        meioambiente: {
            type: String,
            required: true,
        },
});