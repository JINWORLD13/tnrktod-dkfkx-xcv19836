const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 110, checkperiod: 120 });
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../.secret/cosmos-tarot-2024-ef33be4bcecf.json"),
    "utf8"
  )
);
const createJWT = () => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https:
    aud: "https:
    exp: now + 3600,
    iat: now,
  };
  return jwt.sign(payload, serviceAccount.private_key, { algorithm: "RS256" });
};
const getAccessToken = async () => {
  const token = createJWT();
  const response = await axios.post("https:
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: token,
  });
  return response.data.access_token;
};
const getVoidedPurchases = async (packageName) => {
  console.log(`[START] getVoidedPurchases for package: ${packageName}`);
  try {
    const accessToken = await getAccessToken();
    const url = `https:
    const now = Math.floor(Date.now() / 1000); 
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60;
    const response = await axios.get(url, {
      params: {
        startTime: thirtyDaysAgo.toString(),
        endTime: now.toString(),
        maxResults: 1000,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Voided Purchases:", response.data.voidedPurchases);
    return response.data.voidedPurchases;
  } catch (error) {
    console.error("Error fetching voided purchases:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw error;
  } finally {
    console.log(`[END] getVoidedPurchases`);
  }
};
const consumeInAppPurchase = async (
  packageName,
  productId,
  purchaseToken,
  isFirstConsumption = true
) => {
  console.log(`[START] consumeInAppPurchase`);
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(
      `Attempting to consume in-app purchase: PackageName: ${packageName}, ProductId: ${productId}, PurchaseToken: ${purchaseToken}, IsFirstConsumption: ${isFirstConsumption}`
    );
  } else {
    console.log(`Attempting to consume in-app purchase`);
  }
  if (myCache.has(purchaseToken)) {
    console.log("This token has already been consumed recently (Cache hit)");
    return;
  }
  try {
    const accessToken = await getAccessToken();
    if (!isFirstConsumption) {
      console.log("[VERIFY] Verifying purchase before consumption");
      const verifyUrl = `https:
      const verifyRes = await axios.get(verifyUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
    const consumeUrl = `https:
    const consumeRes = await axios.post(
      consumeUrl,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    myCache.set(purchaseToken, true);
    console.log(
      "[CONSUME] Purchase consumed successfully. Response:",
      JSON.stringify(consumeRes.data, null, 2)
    );
    return consumeRes.data;
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
    } else {
      throw err;
    }
  } finally {
    console.log(`[END] consumeInAppPurchase`);
  }
};
module.exports = { consumeInAppPurchase, getVoidedPurchases };
