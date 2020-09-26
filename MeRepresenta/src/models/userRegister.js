import axios from 'axios';

const HOST = '';

export default function userRegisterRequest(nameParam, emailParam, passwordParam, imageParam) {
  axios.post(`${HOST}`, {
    userName: nameParam,
    userEmail: emailParam,
    userPassword: passwordParam,
    userImage: imageParam,
  });
}