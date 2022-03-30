export const accountsAPIURLs = {
  FACEBOOK_AUTH: `/auth/o/facebook/?redirect_uri=${window.location.origin}/callback/facebook`,
  GOOGLE_AUTH: `/auth/o/google-oauth2/?redirect_uri=${window.location.origin}/callback/google`,
};
