const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const axios = require("axios");
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../.secret/cosmos-tarot-2024-ef33be4bcecf.json"), "utf8")
);
function createJWT() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https:
    aud: 'https:
    exp: now + 3600,
    iat: now
  };
  return jwt.sign(payload, serviceAccount.private_key, { algorithm: 'RS256' });
}
async function getAccessToken() {
  const token = createJWT();
  try {
    const response = await axios.post('https:
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}
async function verifyPurchaseWithGooglePlay(
  packageName,
  productId,
  purchaseToken
) {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https:
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.purchaseState === 0;
  } catch (error) {
    console.error("Error verifying purchase with Google Play:", error);
    return false;
  }
}
module.exports = { verifyPurchaseWithGooglePlay };
