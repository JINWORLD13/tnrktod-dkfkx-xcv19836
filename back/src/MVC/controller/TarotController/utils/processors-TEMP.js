const processInAppPurchaseConsumption = require("./processInAppPurchaseConsumption");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const NodeCache = require("node-cache");
const { userService, chargeService } = require("../../../service");
const dataProcessors = {
  processInAppPurchaseConsumption: async (
    packageName,
    productId,
    purchaseToken,
    userInfo,
    prevOrderId,
    orderId
  ) => {
    let isFirstConsumption;
    if (prevOrderId === undefined || prevOrderId === orderId) {
      console.log("First consumption in this session");
      isFirstConsumption = false;
    } else if (prevOrderId !== orderId) {
      console.log("New order detected, marking as first consumption");
      isFirstConsumption = true;
    }
    try {
      await consumeInAppPurchase(
        packageName,
        productId,
        purchaseToken,
        isFirstConsumption
      );
      console.log("In-app purchase consumed successfully");
    } catch (error) {
      console.error("Error consuming in-app purchase:", error);
    }
    return orderId;
  },
  processVoucherConsumption: async (userInfo, inputQuestionData) => {
    try {
      const initialVouchersInDetail = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        13: [],
      };
      const vouchersInDetailOfUser =
        userInfo?.vouchersInDetail || initialVouchersInDetail;
      let updatedVouchersInDetailOfUser = {
        ...initialVouchersInDetail,
        ...vouchersInDetailOfUser,
      };
      const voucherToBeUsed = inputQuestionData.tarotSpreadVoucherPrice; 
      const [voucherType, voucherAmount] = voucherToBeUsed;
      if (voucherAmount <= 0) {
        throw new Error("wrong info on voucher price");
      }
      let voucherAmountToBeUsed = voucherAmount;
      const remainingVouchersArr =
        updatedVouchersInDetailOfUser[voucherType] ?? [];
      console.log("Starting voucher consumption process with priority logic");
      if (remainingVouchersArr.length === 0) {
        console.log("No vouchers available");
        return userInfo;
      }
      const categorizedVouchers =
        categorizeAndSortVouchers(remainingVouchersArr);
      let prevOrderId;
      const priorityGroups = [
        {
          name: "Expiring Web Voucher",
          vouchers: categorizedVouchers.expiredWebVouchers,
        },
        {
          name: "Expiring App Voucher",
          vouchers: categorizedVouchers.expiredAppVouchers,
        },
        {
          name: "Normal Web Voucher",
          vouchers: categorizedVouchers.regularWebVouchers,
        },
        {
          name: "Normal App Voucher",
          vouchers: categorizedVouchers.regularAppVouchers,
        },
      ];
      for (const group of priorityGroups) {
        if (voucherAmountToBeUsed <= 0) break;
        console.log(
          `Processing ${group.name}: ${group.vouchers.length} vouchers available`
        );
        for (
          let i = 0;
          i < group.vouchers.length && voucherAmountToBeUsed > 0;
          i++
        ) {
          console.log(
            `Processing voucher ${i + 1} of ${group.vouchers.length} from ${
              group.name
            }`
          );
          const {
            voucherAmountToBeUsed: remainingAmountToBePaid,
            prevOrderId: updatedPrevOrderId,
          } = await consumeVoucher(
            group.vouchers[i],
            voucherAmountToBeUsed,
            userInfo,
            prevOrderId,
            updatedVouchersInDetailOfUser
          );
          voucherAmountToBeUsed = remainingAmountToBePaid;
          prevOrderId = updatedPrevOrderId;
          if (group.vouchers[i][0] <= 0) {
            group.vouchers.splice(i, 1);
            i--; 
          }
        }
      }
      updatedVouchersInDetailOfUser[voucherType] = [
        ...categorizedVouchers.expiredWebVouchers,
        ...categorizedVouchers.expiredAppVouchers,
        ...categorizedVouchers.regularWebVouchers,
        ...categorizedVouchers.regularAppVouchers,
      ];
      if (voucherAmountToBeUsed > 0) {
        console.log(
          `Warning: Not enough vouchers to consume. Remaining amount: ${voucherAmountToBeUsed}`
        );
      }
      console.log("Voucher consumption process completed");
      const vouchersOfUser = userInfo?.vouchers ?? {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        13: 0,
      };
      let updatedVouchers = { ...vouchersOfUser };
      updatedVouchers[voucherType] =
        vouchersOfUser[voucherType] - voucherAmount;
      const updatedUserInfo = await userService.updateUser({
        ...userInfo,
        vouchersInDetail: { ...updatedVouchersInDetailOfUser },
        vouchers: { ...updatedVouchers },
        isOldUser: true,
      });
      return updatedUserInfo;
    } catch (error) {
      console.error("Error in processVoucherConsumption:", error);
      throw error;
    }
  },
  processInterpretation: (interpretation, inputQuestionData) => {
    let lastEightCharacters = interpretation.trim().slice(-8);
    let lastFiveCharacters = interpretation.trim().slice(-5);
    let lastFourCharacters = interpretation.trim().slice(-4);
    let finalInterpretation;
    if (lastFiveCharacters === "false") {
      finalInterpretation = interpretation.trim().slice(0, -5);
    } else if (lastFourCharacters === "true") {
      finalInterpretation = interpretation.trim().slice(0, -4);
    } else if (lastEightCharacters === "explicit") {
      finalInterpretation = interpretation.trim().slice(0, -8);
    } else {
      finalInterpretation = interpretation.trim();
    }
    const interpretationWithoutQuestionArray = finalInterpretation
      ?.trim()
      ?.split("\n")
      ?.filter(
        (sentence) => sentence !== inputQuestionData.questionInfo.question
      );
    let interpretationWithoutQuestion =
      interpretationWithoutQuestionArray?.join("\n");
    return interpretationWithoutQuestion;
  },
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
async function consumeVoucher(
  voucher,
  voucherAmountToBeUsed,
  userInfo,
  prevOrderId,
  updatedVouchersInDetailOfUser
) {
  const [
    amount,
    _, 
    __, 
    productId,
    orderId,
    purchaseDate,
    ___, 
    ____, 
    purchaseToken,
    packageName,
    ...rest
  ] = voucher;
  const isApp =
    packageName?.split(".")?.length === 3 &&
    packageName?.split(".")?.[0] === "com" &&
    productId?.split("_")?.[0] === "cosmos";
  const amountToUse = Math.min(amount, voucherAmountToBeUsed);
  console.log(`Consuming ${amountToUse} from current voucher`);
  voucher[0] -= amountToUse;
  voucherAmountToBeUsed -= amountToUse;
  if (voucher[0] <= 0) {
    console.log(
      "Voucher fully consumed or amount is zero or negative, removing from array"
    );
  }
  if (isApp) {
    console.log("Processing in-app purchase consumption");
    prevOrderId = await processInAppPurchaseConsumption(
      packageName,
      productId,
      purchaseToken,
      userInfo,
      prevOrderId,
      orderId
    );
  }
  const matchingVouchers = Object.values(updatedVouchersInDetailOfUser)
    .flatMap((vouchers) => vouchers)
    .filter((elem) => elem[4] === orderId);
  const allMatchingVouchersConsumed = matchingVouchers.every(
    (elem) => elem[0] <= 0
  );
  const chargeInDB = await chargeService.getChargeByOrderId(orderId);
  if (
    allMatchingVouchersConsumed &&
    chargeInDB !== undefined &&
    chargeInDB !== null
  ) {
    console.log("All matching vouchers consumed. Deleting charge from DB.");
    await chargeService.deleteChargeByOrderId(orderId);
  }
  return { voucherAmountToBeUsed, prevOrderId };
}
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
function categorizeAndSortVouchers(vouchersArr) {
  const expiredWebVouchers = [];
  const expiredAppVouchers = [];
  const regularWebVouchers = [];
  const regularAppVouchers = [];
  vouchersArr.forEach((voucher) => {
    try {
      const packageName = voucher[9];
      const expireDate = voucher?.[10]; 
      const isApp =
        typeof packageName === "string" && packageName.includes("com.");
      const hasExpireDateAndWithinExpireDate =
        expireDate &&
        expireDate !== "NA" &&
        expireDate !== "N.A" &&
        expireDate !== null &&
        expireDate !== undefined &&
        expireDate.toString().trim() !== "";
      if (hasExpireDateAndWithinExpireDate) {
        if (new Date(expireDate) > new Date()) {
          if (isApp) {
            expiredAppVouchers.push(voucher);
          } else {
            expiredWebVouchers.push(voucher);
          }
        }
      } else {
        if (isApp) {
          regularAppVouchers.push(voucher);
        } else {
          regularWebVouchers.push(voucher);
        }
      }
    } catch (error) {
      console.error("Error categorizing voucher:", error);
      if (new Date(expireDate) > new Date()) regularWebVouchers.push(voucher);
    }
  });
  const sortByExpireDate = (a, b) => {
    try {
      return new Date(a[10]) - new Date(b[10]);
    } catch (error) {
      return 0;
    }
  };
  const sortByPurchaseDate = (a, b) => {
    try {
      return new Date(a[5]) - new Date(b[5]);
    } catch (error) {
      return 0;
    }
  };
  expiredWebVouchers.sort(sortByExpireDate);
  expiredAppVouchers.sort(sortByExpireDate);
  regularWebVouchers.sort(sortByPurchaseDate);
  regularAppVouchers.sort(sortByPurchaseDate);
  console.log(
    `Categorized vouchers: Expiring Web=${expiredWebVouchers.length}, Expiring App=${expiredAppVouchers.length}, Normal Web=${regularWebVouchers.length}, Normal App=${regularAppVouchers.length}`
  );
  return {
    expiredWebVouchers,
    expiredAppVouchers,
    regularWebVouchers,
    regularAppVouchers,
  };
}
module.exports = dataProcessors;
