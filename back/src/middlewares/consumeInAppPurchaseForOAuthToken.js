const axios = require("axios");
const NodeCache = require("node-cache");
const { userService } = require("../MVC/service");
const myCache = new NodeCache({ stdTTL: 110, checkperiod: 120 });
async function getNewAccessToken(refreshToken) {
  console.log("Attempting to get new access token...");
  try {
    const response = await axios({
      method: "post",
      url: "https:
      data: {
        grant_type: "refresh_token",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: refreshToken,
      },
    });
    console.log("New access token obtained successfully");
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting new access token:", error);
    throw error;
  }
}
async function consumeInAppPurchase(
  packageName,
  productId,
  purchaseToken,
  userInfo,
  isFirstConsumption = true
) {
  console.log(`[START] consumeInAppPurchase`);
  console.log(
    `Attempting to consume in-app purchase: PackageName: ${packageName}, ProductId: ${productId}, PurchaseToken: ${purchaseToken}, IsFirstConsumption: ${isFirstConsumption}`
  );
  if (myCache.has(purchaseToken)) {
    console.log("This token has already been consumed recently (Cache hit)");
    return;
  }
  try {
    if (!isFirstConsumption) {
      console.log("[VERIFY] Verifying purchase before consumption");
      const verifyRes = await verifyPurchase(
        packageName,
        productId,
        purchaseToken,
        userInfo.accessToken
      );
      console.log(
        "[VERIFY] Verification response:",
        JSON.stringify(verifyRes.data, null, 2)
      );
      if (verifyRes.data.consumptionState === 1) {
        console.log("This purchase has already been consumed (API check)");
        myCache.set(purchaseToken, true);
        return;
      }
    }
    console.log("[CONSUME] Proceeding with purchase consumption");
    const isValidPurchase = await verifyPurchaseWithGooglePlay(
      packageName,
      productId,
      purchaseToken
    );
    if (isValidPurchase) {
      const consumeRes = await consumePurchase(
        packageName,
        productId,
        purchaseToken,
        userInfo.accessToken
      );
      myCache.set(purchaseToken, true);
      console.log(
        "[CONSUME] Purchase consumed successfully. Response:",
        JSON.stringify(consumeRes.data, null, 2)
      );
      return consumeRes.data;
    }
  } catch (err) {
    console.error("[ERROR] Error in consumeInAppPurchase:", err);
    if (err.response) {
      console.error(
        "Error response:",
        JSON.stringify(err.response.data, null, 2)
      );
    }
    if (err.response && err.response.status === 410) {
      console.log("This purchase has already been consumed (410 error)");
      myCache.set(purchaseToken, true);
    } else if (err.response && err.response.status === 401) {
      console.log(
        "[REFRESH] Access token is invalid. Trying to refresh token..."
      );
      const newAccessToken = await getNewAccessToken(userInfo.refreshToken);
      console.log("[REFRESH] New access token obtained, updating user info");
      await userService.updateUser({
        ...userInfo,
        accessToken: newAccessToken,
      });
      console.log("[RETRY] Retrying consumption with new access token");
      return await consumeInAppPurchase(
        packageName,
        productId,
        purchaseToken,
        { ...userInfo, accessToken: newAccessToken },
        false
      );
    } else {
      throw err;
    }
  } finally {
    console.log(`[END] consumeInAppPurchase`);
  }
}
async function verifyPurchase(
  packageName,
  productId,
  purchaseToken,
  accessToken
) {
  console.log(
    `[VERIFY] Verifying purchase: PackageName: ${packageName}, ProductId: ${productId}, PurchaseToken: ${purchaseToken}`
  );
  const response = await axios.get(
    `https:
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  console.log(
    "[VERIFY] Verification response:",
    JSON.stringify(response.data, null, 2)
  );
  return response;
}
async function consumePurchase(
  packageName,
  productId,
  purchaseToken,
  accessToken
) {
  console.log(
    `[CONSUME] Consuming purchase: PackageName: ${packageName}, ProductId: ${productId}, PurchaseToken: ${purchaseToken}`
  );
  const response = await axios.post(
    `https:
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(
    "[CONSUME] Consumption response:",
    JSON.stringify(response.data, null, 2)
  );
  return response;
}
module.exports = { consumeInAppPurchase };
