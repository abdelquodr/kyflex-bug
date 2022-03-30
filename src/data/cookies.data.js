import { Cookies } from "react-cookie";


const IS_HOST_KEY = "isHost";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export default class CookiesData {
  static cookies = new Cookies();

  static setAccessToken(token, options = {}) {
    CookiesData.cookies.set(ACCESS_TOKEN_KEY, token, options);
  }

  static setRefreshToken(token, options = {}) {
    CookiesData.cookies.set(REFRESH_TOKEN_KEY, token, options);
  }

  static setIsHost(isHost) {
    CookiesData.cookies.set(IS_HOST_KEY, isHost);
  }

  static getIsHost() {
    return CookiesData.cookies.get(IS_HOST_KEY);
  }

  static getAccessToken() {
    return CookiesData.cookies.get(ACCESS_TOKEN_KEY);
  }

  static getRefreshToken() {
    return CookiesData.cookies.get(REFRESH_TOKEN_KEY);
  }

  static purgeCookies() {
    CookiesData.cookies.remove(IS_HOST_KEY);
    CookiesData.cookies.remove(ACCESS_TOKEN_KEY);
    CookiesData.cookies.remove(REFRESH_TOKEN_KEY);
  }
}
