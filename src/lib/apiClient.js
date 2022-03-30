import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import Alert from '@material-ui/lab/Alert';

export const baseURL =
  process.env.REACT_APP_API_ORIGIN || 'http://localhost:8000/';

  

const apiClient = axios.create({
  baseURL,
  // timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const camelToUnderscore = (key) => {
  var result = key.replace(/([A-Z])/g, ' $1');
  return result.split(' ').join('_').toLowerCase();
};

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = function (a) {
  return Array.isArray(a);
};

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const keysTo = (o, fn) => {
  if (isArray(o)) {
    return o.map((i) => {
      return keysTo(i, fn);
    });
  } else if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[fn(k)] = keysTo(o[k], fn);
    });
    if (!o.id) {
      n['id'] = o.pk;
    }
    return n;
  }

  return o;
};

apiClient.defaults.headers = {
  ...apiClient.defaults.headers,
  // EUTOAQUI: 'teste',
};

apiClient.interceptors.request.use((config) => {
  // config.headers.post = {...config.headers.post, 'Content-Type': 'application/json'};
  if (config.data && !config.skipTransform) {
    config.data = keysTo(config.data, camelToUnderscore);
  }
  console.log('REQUEST', config);
  return config;
});

apiClient.interceptors.request.use(function (config) {
  if (document.cookie !== '') {
    const csrftoken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken'));
      // console.log("document.cookie.split('; ')", document.cookie)
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken.split('=')[1];
    } else {
      delete config.headers['X-CSRFToken'];
    }
  }

  const kyTokens = JSON.parse(window.localStorage.getItem('ky-tokens'));
  if (kyTokens && kyTokens.accessToken) {
    config.headers['Authorization'] = `Bearer ${kyTokens.accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const data = keysTo(response.data, toCamel);
    const res = { ...response, data };
    return res;
  },
  (err) => {
    // throw err; 
    return err.response
  }
);

export default apiClient;

export const useAxios = makeUseAxios({
  axios: apiClient,
});
