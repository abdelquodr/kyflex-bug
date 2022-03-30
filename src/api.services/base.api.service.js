import Axios from "axios";
import { Cookies } from "react-cookie";
import { accountsAPIURLs } from "../constants/api.urls.constant";

export default class BaseAPIService {
  apiURL = 'http://localhost:3000';

  constructor() {
    this.client = Axios.create({ baseURL: this.apiURL, withCredentials: true });
    this.client.interceptors.request.use((config) => {
      const accessToken = new Cookies().get('accessToken');
      if (
        accessToken && ![
          accountsAPIURLs.GOOGLE_AUTH, accountsAPIURLs.FACEBOOK_AUTH,
        ].includes(config.url)
      ) config.headers.authorization = `Bearer ${accessToken}`;

      return config;
    });
    this.client.interceptors.response.use((resp) => {
      return resp;
    }, (error) => {
      return Promise.reject(error.response.data);
    });
  }
}
