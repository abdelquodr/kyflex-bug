import axios from 'axios';

const baseURL = 'http://localhost:3000/';

const apiClient = axios.create({
  baseURL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.defaults.headers = {
  ...apiClient.defaults.headers,
  EUTOAQUI: 'teste',
};

// TODO: Remove Logs
apiClient.interceptors.request.use((config) => {
  // config.headers.post = {...config.headers.post, 'Content-Type': 'application/json'};
  console.log('REQUEST', config);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // config.headers.post = {...config.headers.post, 'Content-Type': 'application/json'};
    console.log('RESPONSE', response);
    return response;
  },
  (err) => {
    console.log('ERROR RESPONSE', err.response);
    throw err;
  }
);

export default apiClient;
