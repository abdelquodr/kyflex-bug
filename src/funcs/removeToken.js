// import axios from 'axios'; //for REST api calls to the django server

/*
    This function removes the authenticate token.
*/

const RemoveToken = (cookies, token) => {
  cookies.remove('JWT', token, { path: '/' });
};

export { RemoveToken };
