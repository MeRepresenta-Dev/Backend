const dynamoose = require('dynamoose');
const uuid = require('uuid');

dynamoose.aws.sdk.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});


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

  confirmaSenha: {
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
    type: Number,
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

  identidadedeGenero: {
    type: String,
    required: true,
  },

  deficiencia: {
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

module.exports = dynamoose.model('User', UserSchema);

