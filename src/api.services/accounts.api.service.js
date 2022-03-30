import { accountsAPIURLs } from '../constants/api.urls.constant';
import BaseAPIService from './base.api.service';


export default class AccountsAPIService extends BaseAPIService {
  register(dto) {
    return this.client.post('/users/', dto);
  }

  resendActivation(email) {
    return this.client.post('/users/resend_activation/', { email });
  }

  signin(dto) {
    return this.client.post('/auth/jwt/create', dto);
  }

  getSocialAuthURL(provider) {
    const url = provider === 'google' ? accountsAPIURLs.GOOGLE_AUTH : accountsAPIURLs.FACEBOOK_AUTH;
    return this.client.get(url);
  }

  socialLogin(provider, dto) {
    const url = provider === 'google' ? accountsAPIURLs.GOOGLE_AUTH : accountsAPIURLs.FACEBOOK_AUTH;
    return this.client.post(url, dto);
  }

  verifyToken(accessToken) {
    return this.client.post('/auth/jwt/verify', { token: accessToken });
  }

  refreshToken(refreshToken) {
    return this.client.post('/auth/jwt/refresh', { refresh: refreshToken });
  }

  getOwnProfile(isHost) {
    return this.client.get('/users/me/', { params: { is_host: isHost } });
  }

  updateProfile(dto) {
    return this.client.patch('/users/me/', dto);
  }

  resetPassword(email) {
    return this.client.post('/users/reset_password/', { email });
  }

  logout(refreshToken) {
    return this.client.post('/auth/logout/', { refresh: refreshToken });
  }

  verifyEmail(code) {
    return this.client.post('/auth/registration/verify-email/', { key: code });
  }

  getReviews(id) {
    return this.client.get(`/reviews/host/${id}`);
  }
};
