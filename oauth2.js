const OAUTH2_PROVIDER = 'hhstaging.hungryhub.com/dashboard/v2/owners/sign_in?locale=en';
const OAUTH2_CLIENT_ID = '0_fwWVrm8U_VtDPxPQ4oUZGChZfUrAZ_WagGXQeEhOA';
const OAUTH2_CLIENT_SECRET = 'e7i_CWH8TQLev9cwAwODIw5sCCdI7Icp5DrdKqaP_1U';
const OAUTH2_CALLBACK_URL = 'http://103.58.151.121:8080/HungryHubCallBack';

let accessToken = null;
let refreshToken = null;

// Request an access token
function requestAccessToken() {
  // Redirect the user to the OAuth2 provider's authorization endpoint
  window.location = `https://${OAUTH2_PROVIDER}/oauth2/authorize?client_id=${OAUTH2_CLIENT_ID}&response_type=token&redirect_uri=${OAUTH2_CALLBACK_URL}`;
}

// Handle the access token response from the OAuth2 provider
function handleAccessTokenResponse() {
  // Parse the access token and refresh token from the URL hash fragment
  const hash = window.location.hash.substr(1);
  const params = new URLSearchParams(hash);
  accessToken = params.get('access_token');
  refreshToken = params.get('refresh_token');

  // Exchange the access token for an access token and refresh token
  fetch(`https://${OAUTH2_PROVIDER}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${accessToken}&client_id=${OAUTH2_CLIENT_ID}&client_secret=${OAUTH2_CLIENT_SECRET}`
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to exchange access token for access token and refresh token');
    }
  }).then(json => {
    accessToken = json.access_token;
    refreshToken = json.refresh_token;

    // TODO: Use the access token to make authenticated requests to the OAuth2 provider's API
  }).catch(error => {
    // Handle the error
    // TODO: Add error handling
});
}

// Request an access token when the page loads
requestAccessToken();

// Handle the access token response when the page is redirected
handleAccessTokenResponse();
