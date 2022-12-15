const OAUTH2_PROVIDER = 'hhstaging.hungryhub.com';
const OAUTH2_CLIENT_ID = '0_fwWVrm8U_VtDPxPQ4oUZGChZfUrAZ_WagGXQeEhOA';
const OAUTH2_CLIENT_SECRET = 'e7i_CWH8TQLev9cwAwODIw5sCCdI7Icp5DrdKqaP_1U';
const OAUTH2_CALLBACK_URL = 'https://2b35-103-58-151-121.ap.ngrok.io/HungryHubCallBack';
const code = null;

let accessToken = null;
let refreshToken = null;

function requestCode() {
  
  // Redirect the user to the OAuth2 provider's authorization endpoint
  let requestCodeUrl = `https://${OAUTH2_PROVIDER}/oauth/authorize?client_id=${OAUTH2_CLIENT_ID}&redirect_uri=${OAUTH2_CALLBACK_URL}&response_type=code&scope=dashboard_v2_owner-full+dashboard_v2_restaurant_group-full`
  console.log(requestCodeUrl)
  }

// Handle the access token response from the OAuth2 provider
function handleAccessTokenResponse() {
  // Exchange the access token for an access token and refresh token
  fetch(`https://${OAUTH2_PROVIDER}/partners/token.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "code": "read from requestCode above",
      "grant_type": "authorization_code",
      "redirect_uri": OAUTH2_CALLBACK_URL
    })
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

requestCode();

// Handle the access token response when the page is redirected
handleAccessTokenResponse();
