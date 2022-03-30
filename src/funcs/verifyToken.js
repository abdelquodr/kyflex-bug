import axios from 'axios'; //for REST api calls to the django server

/*
    This function verifies the token
    to authenticate users.
*/

const VerifyToken = (cookies) => {
  const JWT = cookies.get('JWT');
  return axios
    .post('http://localhost:8000/auth/jwt/verify/', {
      token: JWT,
    })
    .catch((err) => console.log(err));
};

export { VerifyToken };
