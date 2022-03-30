import axios from 'axios'; //for REST api calls to the django server

const GetAccessToken = (cookies) => {
  const access_token = cookies.get('initial_token');
  const refresh_token = cookies.get('refresh_token');
  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${access_token}`,
  };

  axios
    .post(
      'http://localhost:8000/auth/jwt/verify/',
      {
        token: access_token,
      },
      { headers }
    )
    .then(() => access_token)
    .catch(() => {
      axios
        .post(
          'http://localhost:8000/auth/jwt/refresh/',
          {
            refresh: refresh_token,
          },
          { headers }
        )
        .then((res) => {
          const { access, refresh } = res.data;
          cookies.set('initial_token', access, { path: '/' });
          cookies.set('refresh_token', refresh, { path: '/' });
          return access;
        })
        .catch((err) => console.log(err));
    });
};

export { GetAccessToken };
